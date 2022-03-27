#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <math.h>
#include <emscripten.h>

#include <libavutil/avassert.h>
#include <libavutil/channel_layout.h>
#include <libavutil/opt.h>
#include <libavutil/mathematics.h>
#include <libavutil/timestamp.h>
#include <libavcodec/avcodec.h>
#include <libavformat/avformat.h>
#include <libswscale/swscale.h>
#include <libswresample/swresample.h>
#include "./audio_decoder.c"

/*
 * Copyright (c) 2003 Fabrice Bellard
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * @file
 * libavformat API example.
 *
 * Output a media file in any supported libavformat format. The default
 * codecs are used.
 * @example muxing.c
 */

#define STREAM_DURATION 10.0
#define STREAM_FRAME_RATE 25              /* 25 images/s */
#define STREAM_PIX_FMT AV_PIX_FMT_YUV420P /* default pix_fmt */

#define SCALE_FLAGS SWS_BICUBIC

// a wrapper around a single output AVStream
typedef struct OutputStream
{
  AVStream *st;
  AVCodecContext *enc;

  /* pts of the next frame that will be generated */
  int64_t next_pts;
  int samples_count;

  AVFrame *frame;
  AVFrame *tmp_frame;

  AVPacket *tmp_pkt;

  float t, tincr, tincr2;

  struct SwrContext *swr_ctx;
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
    fprintf(stderr, "Error sending a frame to the encoder: %s\n",
            av_err2str(ret));
    exit(1);
  }

  while (ret >= 0)
  {
    ret = avcodec_receive_packet(c, pkt);
    if (ret == AVERROR(EAGAIN) || ret == AVERROR_EOF)
      break;
    else if (ret < 0)
    {
      fprintf(stderr, "Error encoding a frame: %s\n", av_err2str(ret));
      exit(1);
    }

    /* rescale output packet timestamp values from codec to stream timebase */
    av_packet_rescale_ts(pkt, c->time_base, st->time_base);
    pkt->stream_index = st->index;
    pkt->pts = av_rescale_q(pkt->pts, c->time_base, st->time_base);
    pkt->dts = av_rescale_q(pkt->dts, c->time_base, st->time_base);
    pkt->duration = av_rescale_q(pkt->duration, c->time_base, st->time_base);

    /* Write the compressed frame to the media file. */
    // log_packet(fmt_ctx, pkt);
    ret = av_interleaved_write_frame(fmt_ctx, pkt);
    /* pkt is now blank (av_interleaved_write_frame() takes ownership of
     * its contents and resets pkt), so that no unreferencing is necessary.
     * This would be different if one used av_write_frame(). */
    if (ret < 0)
    {
      fprintf(stderr, "Error while writing output packet: %s\n", av_err2str(ret));
      exit(1);
    }
  }

  return ret == AVERROR_EOF ? 1 : 0;
}

/* Add an output stream. */
static void add_stream(OutputStream *ost, AVFormatContext *oc,
                       const AVCodec **codec,
                       enum AVCodecID codec_id)
{
  AVCodecContext *c;
  int i;

  /* find the encoder */
  *codec = avcodec_find_encoder(codec_id);
  if (!(*codec))
  {
    fprintf(stderr, "Could not find encoder for '%s'\n", avcodec_get_name(codec_id));
    exit(1);
  }

  ost->tmp_pkt = av_packet_alloc();
  if (!ost->tmp_pkt)
  {
    fprintf(stderr, "Could not allocate AVPacket\n");
    exit(1);
  }

  ost->st = avformat_new_stream(oc, codec);
  if (!ost->st)
  {
    fprintf(stderr, "Could not allocate stream\n");
    exit(1);
  }
  ost->st->id = oc->nb_streams - 1;
  c = avcodec_alloc_context3(*codec);
  if (!c)
  {
    fprintf(stderr, "Could not alloc an encoding context\n");
    exit(1);
  }
  ost->enc = c;

  switch ((*codec)->type)
  {
  case AVMEDIA_TYPE_AUDIO:
    c->sample_fmt = (*codec)->sample_fmts ? (*codec)->sample_fmts[0] : AV_SAMPLE_FMT_FLTP;
    c->bit_rate = 64000;
    c->sample_rate = 48000;
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
}

/**************************************************************/
/* audio output */

static AVFrame *alloc_audio_frame(enum AVSampleFormat sample_fmt,
                                  uint64_t channel_layout,
                                  int sample_rate, int nb_samples)
{
  AVFrame *frame = av_frame_alloc();
  int ret;

  if (!frame)
  {
    fprintf(stderr, "Error allocating an audio frame\n");
    exit(1);
  }

  frame->format = sample_fmt;
  frame->channel_layout = channel_layout;
  frame->sample_rate = sample_rate;
  frame->nb_samples = nb_samples;

  if (nb_samples)
  {
    ret = av_frame_get_buffer(frame, 0);
    if (ret < 0)
    {
      fprintf(stderr, "Error allocating an audio buffer\n");
      exit(1);
    }
  }

  return frame;
}

static void open_audio(AVFormatContext *oc, const AVCodec *codec,
                       OutputStream *ost, AVDictionary *opt_arg)
{
  int ret;
  int nb_samples;
  AVCodecContext *c;
  AVDictionary *opt = NULL;

  c = ost->enc;
  c->strict_std_compliance = -2;

  /* open it */
  av_dict_copy(&opt, opt_arg, 0);
  ret = avcodec_open2(c, codec, &opt);
  av_dict_free(&opt);
  if (ret < 0)
  {
    fprintf(stderr, "Could not open audio codec: %s\n", av_err2str(ret));
    exit(1);
  }

  /* init signal generator */
  ost->t = 0;
  ost->tincr = 2 * M_PI * 110.0 / c->sample_rate;
  /* increment frequency by 110 Hz per second */
  ost->tincr2 = 2 * M_PI * 110.0 / c->sample_rate / c->sample_rate;

  if (c->codec->capabilities & AV_CODEC_CAP_VARIABLE_FRAME_SIZE)
    nb_samples = 10000;
  else
    nb_samples = c->frame_size;

  ost->frame = alloc_audio_frame(c->sample_fmt, c->channel_layout,
                                 c->sample_rate, nb_samples);
  ost->tmp_frame = alloc_audio_frame(AV_SAMPLE_FMT_S16, c->channel_layout,
                                     c->sample_rate, nb_samples);

  /* copy the stream parameters to the muxer */
  ret = avcodec_parameters_from_context(ost->st->codecpar, c);
  if (ret < 0)
  {
    fprintf(stderr, "Could not copy the stream parameters\n");
    exit(1);
  }

  /* create resampler context */
  ost->swr_ctx = swr_alloc();
  if (!ost->swr_ctx)
  {
    fprintf(stderr, "Could not allocate resampler context\n");
    exit(1);
  }

  /* set options */
  av_opt_set_int(ost->swr_ctx, "in_channel_count", c->channels, 0);
  av_opt_set_int(ost->swr_ctx, "in_sample_rate", c->sample_rate, 0);
  av_opt_set_sample_fmt(ost->swr_ctx, "in_sample_fmt", AV_SAMPLE_FMT_S16, 0);
  av_opt_set_int(ost->swr_ctx, "out_channel_count", c->channels, 0);
  av_opt_set_int(ost->swr_ctx, "out_sample_rate", c->sample_rate, 0);
  av_opt_set_sample_fmt(ost->swr_ctx, "out_sample_fmt", c->sample_fmt, 0);

  /* initialize the resampling context */
  if ((ret = swr_init(ost->swr_ctx)) < 0)
  {
    fprintf(stderr, "Failed to initialize the resampling context\n");
    exit(1);
  }
}

/*
 * encode one audio frame and send it to the muxer
 * return 1 when encoding is finished, 0 otherwise
 */
static int write_audio_frame(AVFormatContext *oc, OutputStream *ost, uint8_t *indata, int dst_nb_samples)
{
  AVCodecContext *c;
  int ret;

  c = ost->enc;

  AVFrame *frame = ost->frame;

  /* when we pass a frame to the encoder, it may keep a reference to it
   * internally;
   * make sure we do not overwrite it here
   */
  ret = av_frame_make_writable(ost->frame);
  if (ret < 0)
    exit(1);

  /* convert to destination format */
  ret = swr_convert(ost->swr_ctx,
                    ost->frame->data, dst_nb_samples,
                    indata, frame->nb_samples);
  if (ret < 0)
  {
    fprintf(stderr, "Error while converting\n");
    exit(1);
  }

  frame->pts = av_rescale_q(ost->samples_count, (AVRational){1, c->sample_rate}, c->time_base);
  ost->samples_count += dst_nb_samples;

  return write_frame(oc, c, ost->st, frame, ost->tmp_pkt);
}

static void close_stream(AVFormatContext *oc, OutputStream *ost)
{
  avcodec_free_context(&ost->enc);
  av_frame_free(&ost->frame);
  av_frame_free(&ost->tmp_frame);
  av_packet_free(&ost->tmp_pkt);
  swr_free(&ost->swr_ctx);
}

int encode(const char *inputFile, const char *filename, const char *callbackId)
{
  OutputStream audio_st = {0};
  AVFormatContext *oc;
  FILE *inStream;
  const AVCodec *audio_codec;
  int ret;
  int encode_audio = 1;
  AVDictionary *opt = NULL;
  int i;

  /* allocate the output media context */
  avformat_alloc_output_context2(&oc, NULL, "ogg", filename);
  if (!oc)
  {
    printf("Could not deduce output format from file extension: using ogg.\n");
    return 1;
  }

  add_stream(&audio_st, oc, &audio_codec, AV_CODEC_ID_OPUS);

  open_audio(oc, audio_codec, &audio_st, opt);

  av_dump_format(oc, 0, filename, 1);

  /* open the output file, if needed */
  ret = avio_open(&oc->pb, filename, AVIO_FLAG_WRITE);
  if (ret < 0)
  {
    fprintf(stderr, "Could not open '%s': %s\n", filename,
            av_err2str(ret));
    return 1;
  }

  /* Write the stream header, if any. */
  ret = avformat_write_header(oc, &opt);
  if (ret < 0)
  {
    fprintf(stderr, "Error occurred when opening output file: %s\n",
            av_err2str(ret));
    return 1;
  }

  AVCodecContext *c = audio_st.enc;

  // 创建输入输出流
  inStream = fopen(inputFile, "rb");
  if (!inStream)
  {
    LOG("Could not open %s\n", inputFile);
  }

  /* frame containing input raw audio */
  AVFrame *frame = audio_st.frame;

  int readSize = av_samples_get_buffer_size(NULL, 2, frame->nb_samples,c->sample_fmt, 1);
  char *read_buf = (char *)malloc(readSize);

  LOG("out-samples: %d - \n", readSize);

  while (encode_audio)
  {
    int size = fread(read_buf, 1, readSize, inStream);
    encode_audio = size > 0;
    if (encode_audio)
    {
      const uint8_t *indata[AV_NUM_DATA_POINTERS] = {0};
      indata[0] = (uint8_t *)read_buf;
      write_audio_frame(oc, &audio_st, indata, frame->nb_samples);
    }
  }

  /* Write the trailer, if any. The trailer must be written before you
   * close the CodecContexts open when you wrote the header; otherwise
   * av_write_trailer() may try to use memory that was freed on
   * av_codec_close(). */
  av_write_trailer(oc);

  close_stream(oc, &audio_st);

  /* Close the output file. */
  avio_closep(&oc->pb);

  /* free the stream */
  avformat_free_context(oc);

  EM_ASM({
    var callbackId = UTF8ToString($0);
    var callback = window[callbackId];
    var outFile = UTF8ToString($1);
    var inputFile = UTF8ToString($2);
    var ch = FS.readFile(outFile);
    var buffer = new Float32Array(ch);
    FS.unlink(outFile);
    FS.unlink(inputFile);
    callback(buffer);
  },
         callbackId, filename, inputFile);

  return ret;
}