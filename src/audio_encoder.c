#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <math.h>
#include <emscripten.h>

#include <libavutil/channel_layout.h>
#include <libavutil/opt.h>
#include <libavutil/mathematics.h>
#include <libavutil/timestamp.h>
#include <libavcodec/avcodec.h>
#include <libavformat/avformat.h>
#include <libswscale/swscale.h>
#include <libswresample/swresample.h>
#include "./audio_decoder.c"

// a wrapper around a single output AVStream
typedef struct OutputStream
{
  AVStream *st;
  AVCodecContext *enc;

  /* pts of the next frame that will be generated */
  int64_t next_pts;
  int samples_count;

  AVFrame *frame;
  AVFrame *src_frame;

  AVPacket *tmp_pkt;

  struct SwrContext *swr_ctx;

  int max_dst_nb_samples;

} OutputStream;

static void log_packet(const AVFormatContext *fmt_ctx, const AVPacket *pkt)
{
  AVRational *time_base = &fmt_ctx->streams[pkt->stream_index]->time_base;

  printf("pts:%s pts_time:%s dts:%s dts_time:%s duration:%s duration_time:%s stream_index:%d\n",
         av_ts2str(pkt->pts), av_ts2timestr(pkt->pts, time_base),
         av_ts2str(pkt->dts), av_ts2timestr(pkt->dts, time_base),
         av_ts2str(pkt->duration), av_ts2timestr(pkt->duration, time_base),
         pkt->stream_index);
}

static int write_frame(AVFormatContext *fmt_ctx, AVCodecContext *c,
                       AVStream *st, AVFrame *frame, AVPacket *pkt)
{
  int ret;

  // send the frame to the encoder
  ret = avcodec_send_frame(c, frame);
  if (ret < 0)
  {
    LOG("Error sending a frame to the encoder: %s\n", av_err2str(ret));
    return ret;
  }

  while (ret >= 0)
  {
    ret = avcodec_receive_packet(c, pkt);
    if (ret == AVERROR(EAGAIN) || ret == AVERROR_EOF)
      break;
    else if (ret < 0)
    {
      LOG("Error encoding a frame: %s\n", av_err2str(ret));
      return ret;
    }

    /* rescale output packet timestamp values from codec to stream timebase */
    av_packet_rescale_ts(pkt, c->time_base, st->time_base);
    pkt->stream_index = st->index;

    /* Write the compressed frame to the media file. */
    // log_packet(fmt_ctx, pkt);
    ret = av_interleaved_write_frame(fmt_ctx, pkt);
    /* pkt is now blank (av_interleaved_write_frame() takes ownership of
     * its contents and resets pkt), so that no unreferencing is necessary.
     * This would be different if one used av_write_frame(). */
    if (ret < 0)
    {
      LOG("Error while writing output packet: %s\n", av_err2str(ret));
      return ret;
    }
  }

  return ret == AVERROR_EOF ? 1 : 0;
}

/* Add an output stream. */
static int add_stream(OutputStream *ost, AVFormatContext *oc,
                      const AVCodec **codec,
                      enum AVCodecID codec_id,
                      int bitRate)
{
  AVCodecContext *c;
  int ret;
  int i;

  /* find the encoder */
  *codec = avcodec_find_encoder(codec_id);
  if (!(*codec))
  {
    LOG("Could not find encoder for '%s'\n", avcodec_get_name(codec_id));
    return -1;
  }

  ost->tmp_pkt = av_packet_alloc();
  if (!ost->tmp_pkt)
  {
    LOG("Could not allocate AVPacket\n");
    return -1;
  }

  ost->st = avformat_new_stream(oc, *codec);
  if (!ost->st)
  {
    LOG("Could not allocate stream\n");
    return -1;
  }
  ost->st->id = oc->nb_streams - 1;
  ost->st->codecpar->codec_tag = 0;
  ost->st->codecpar->codec_type = AVMEDIA_TYPE_AUDIO;
  c = avcodec_alloc_context3(*codec);
  if (!c)
  {
    LOG("Could not alloc an encoding context\n");
    return -1;
  }
  ost->enc = c;

  LOG("or %d", bitRate);
  switch ((*codec)->type)
  {
  case AVMEDIA_TYPE_AUDIO:
    c->sample_fmt = (*codec)->sample_fmts ? (*codec)->sample_fmts[0] : AV_SAMPLE_FMT_FLTP;
    c->bit_rate = bitRate > 0 ? bitRate : 64000;
    c->sample_rate = 44100;
    if ((*codec)->supported_samplerates)
    {
      c->sample_rate = (*codec)->supported_samplerates[0];
      for (i = 0; (*codec)->supported_samplerates[i]; i++)
      {
        if ((*codec)->supported_samplerates[i] == 44100)
          c->sample_rate = 44100;
      }
    }
    c->channels = av_get_channel_layout_nb_channels(c->channel_layout);
    c->channel_layout = AV_CH_LAYOUT_STEREO;
    if ((*codec)->channel_layouts)
    {
      c->channel_layout = (*codec)->channel_layouts[0];
      for (i = 0; (*codec)->channel_layouts[i]; i++)
      {
        if ((*codec)->channel_layouts[i] == AV_CH_LAYOUT_STEREO)
          c->channel_layout = AV_CH_LAYOUT_STEREO;
      }
    }
    c->channels = av_get_channel_layout_nb_channels(c->channel_layout);
    ost->st->time_base = (AVRational){1, c->sample_rate};
    break;

  default:
    break;
  }

  /* Some formats want stream headers to be separate. */
  if (oc->oformat->flags & AVFMT_GLOBALHEADER)
    c->flags |= AV_CODEC_FLAG_GLOBAL_HEADER;

  return 0;
}

/**************************************************************/
/* audio output */

static AVFrame *alloc_audio_frame(enum AVSampleFormat sample_fmt,
                                  uint64_t channel_layout,
                                  int sample_rate, int nb_samples, int align)
{
  AVFrame *frame = av_frame_alloc();
  int ret;

  if (!frame)
  {
    LOG("Error allocating an audio frame  \n");
    return NULL;
  }

  frame->format = sample_fmt;
  frame->channel_layout = channel_layout;
  frame->sample_rate = sample_rate;
  frame->nb_samples = nb_samples;

  if (nb_samples)
  {
    ret = av_frame_get_buffer(frame, align);
    if (ret < 0)
    {
      LOG("Error allocating an audio buffer fmt: %d channel_layout: %d rate: %d samples: %d \n", sample_fmt, channel_layout, sample_rate, nb_samples);
      return NULL;
    }
  }

  return frame;
}

static int open_audio(AVFormatContext *oc, const AVCodec *codec, OutputStream *ost, AVDictionary *opt_arg, const char *format, int ar, int ac)
{
  AVCodecContext *c;
  int nb_samples;
  int ret;
  AVDictionary *opt = NULL;

  c = ost->enc;
  c->strict_std_compliance = -2;

  enum AVSampleFormat fmt = av_get_sample_fmt(format);

  /* open it */
  av_dict_copy(&opt, opt_arg, 0);
  ret = avcodec_open2(c, codec, &opt);
  av_dict_free(&opt);
  if (ret < 0)
  {
    LOG("Could not open audio codec: %s\n", av_err2str(ret));
    return ret;
  }

  if (c->codec->capabilities & AV_CODEC_CAP_VARIABLE_FRAME_SIZE)
    nb_samples = 10000;
  else
    nb_samples = c->frame_size;

  int inSamples = av_rescale_rnd(nb_samples, ar, c->sample_rate, AV_ROUND_UP);

  ost->src_frame = alloc_audio_frame(fmt, c->channel_layout, ar, inSamples, 1);

  ost->frame = alloc_audio_frame(c->sample_fmt, c->channel_layout, c->sample_rate, nb_samples, 1);

  if (ost->src_frame == NULL || ost->frame == NULL)
  {
    return -1;
  }

  if (ac > 0)
  {
    ost->src_frame->channels = ac;
  }

  /* copy the stream parameters to the muxer */
  ret = avcodec_parameters_from_context(ost->st->codecpar, c);
  if (ret < 0)
  {
    LOG("Could not copy the stream parameters\n");
    return ret;
  }

  /* create resampler context */
  ost->swr_ctx = swr_alloc();
  if (!ost->swr_ctx)
  {
    LOG("Could not allocate resampler context\n");
    return -1;
  }

  /* set options */
  av_opt_set_int(ost->swr_ctx, "in_channel_count", ost->src_frame->channels, 0);
  av_opt_set_int(ost->swr_ctx, "in_sample_rate", ost->src_frame->sample_rate, 0);
  av_opt_set_sample_fmt(ost->swr_ctx, "in_sample_fmt", ost->src_frame->format, 0);
  av_opt_set_int(ost->swr_ctx, "out_channel_count", ost->frame->channels, 0);
  av_opt_set_int(ost->swr_ctx, "out_sample_rate", ost->frame->sample_rate, 0);
  av_opt_set_sample_fmt(ost->swr_ctx, "out_sample_fmt", ost->frame->format, 0);

  /* initialize the resampling context */
  if ((ret = swr_init(ost->swr_ctx)) < 0)
  {
    LOG("Failed to initialize the resampling context\n");
    return ret;
  }

  return 0;
}

/*
 * encode one audio frame and send it to the muxer
 * return 1 when encoding is finished, 0 otherwise
 */
static int write_audio_frame(AVFormatContext *oc, OutputStream *ost)
{
  AVCodecContext *c = ost->enc;
  AVFrame *frame = ost->frame;
  AVFrame *srcFrame = ost->src_frame;
  int ret;
  int dst_nb_samples = frame->nb_samples;

  /* when we pass a frame to the encoder, it may keep a reference to it
   * internally;
   * make sure we do not overwrite it here
   */
  ret = av_frame_make_writable(frame);
  if (ret < 0)
  {
    LOG("av_frame_make_writable fail");
    return ret;
  }

  /* convert to destination format */
  ret = swr_convert(ost->swr_ctx, frame->data, frame->nb_samples, (const uint8_t **)srcFrame->data, srcFrame->nb_samples);
  if (ret < 0)
  {
    LOG("Error while converting\n");
    return ret;
  }

  frame->pts = av_rescale_q(ost->samples_count, (AVRational){1, c->sample_rate}, c->time_base);
  ost->samples_count += frame->nb_samples;

  return write_frame(oc, c, ost->st, frame, ost->tmp_pkt);
}

static void close_stream(AVFormatContext *oc, OutputStream *ost)
{
  avcodec_free_context(&ost->enc);
  av_frame_free(&ost->frame);
  av_frame_free(&ost->src_frame);
  av_packet_free(&ost->tmp_pkt);
  swr_free(&ost->swr_ctx);
}

int encode(const char *inputFile, const char *filename, const char *callbackId, const char *format, int ar, int ac, int bitRate)
{
  int ret;
  OutputStream audio_st = {0};
  const AVOutputFormat *fmt;
  AVFormatContext *oc;
  const AVCodec *audio_codec;
  AVDictionary *opt = NULL;

  /* allocate the output media context */
  avformat_alloc_output_context2(&oc, NULL, NULL, filename);
  if (!oc)
  {
    LOG("Could not deduce output format from file extension: %s .\n", filename);
    ret = 1;
    goto flush;
  }

  fmt = oc->oformat;

  // LOG("ffmpeg %d", avcodec_get_name(oc->oformat->audio_codec));

  ret = add_stream(&audio_st, oc, &audio_codec, AV_CODEC_ID_OPUS, bitRate);

  if (ret < 0)
  {
    LOG("add_stream fail %d", ret);
    goto flush;
  }

  ret = open_audio(oc, audio_codec, &audio_st, opt, format, ar, ac);

  if (ret < 0)
  {
    LOG("open_audio fail %d", ret);
    goto flush;
  }

  av_dump_format(oc, 0, filename, 1);

  /* open the output file, if needed */
  if (!(fmt->flags & AVFMT_NOFILE))
  {
    ret = avio_open(&oc->pb, filename, AVIO_FLAG_WRITE);
    if (ret < 0)
    {
      LOG("Could not open '%s': %s\n", filename, av_err2str(ret));
      goto flush;
    }
  }

  /* Write the stream header, if any. */
  ret = avformat_write_header(oc, &opt);
  if (ret < 0)
  {
    LOG("Error occurred when opening output file: %s\n", av_err2str(ret));
    goto flush;
  }

  AVCodecContext *c = audio_st.enc;
  AVFrame *s16_frame = audio_st.src_frame;
  AVFrame *fltp_frame = audio_st.frame;
  FILE *inStream = fopen(inputFile, "rb");

  int readSize = s16_frame->linesize[0];

  av_frame_make_writable(s16_frame);

  while (fread(s16_frame->data[0], 1, readSize, inStream) > 0)
  {
    ret = write_audio_frame(oc, &audio_st);
    if (ret < 0)
    {
      goto flush;
    }
  }

  /* Write the trailer, if any. The trailer must be written before you
   * close the CodecContexts open when you wrote the header; otherwise
   * av_write_trailer() may try to use memory that was freed on
   * av_codec_close(). */
  av_write_trailer(oc);

flush:

  if (fmt != NULL && !(fmt->flags & AVFMT_NOFILE))
  {
    /* Close the output file. */
    avio_closep(&oc->pb);
  }

  close_stream(oc, &audio_st);

  /* free the stream */
  avformat_free_context(oc);

  EM_ASM({
    var scope = typeof window == 'object' ? window : self;
    var callbackId = UTF8ToString($0);
    var callback = scope[callbackId];
    var outFile = UTF8ToString($1);
    var inputFile = UTF8ToString($2);
    var ret = $3;
    var success = ret >= 0;
    var buffer = success ? FS.readFile(outFile) : NULL;
    FS.unlink(inputFile);
    FS.unlink(outFile);
    callback(buffer);
  },
  callbackId, filename, inputFile, ret);

  return ret;
}