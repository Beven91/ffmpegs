#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <emscripten.h>

#include <libavcodec/avcodec.h>
#include <libavcodec/codec_id.h>
#include <libavformat/avformat.h>
#include <libavutil/channel_layout.h>
#include <libavutil/common.h>
#include <libavutil/frame.h>
#include <libavutil/samplefmt.h>
#include <libswresample/swresample.h>
#include "./audio_decoder.c"

/* check that a given sample format is supported by the encoder */
static int check_sample_fmt(const AVCodec *codec, enum AVSampleFormat sample_fmt)
{
  const enum AVSampleFormat *p = codec->sample_fmts;

  while (*p != AV_SAMPLE_FMT_NONE)
  {
    if (*p == sample_fmt)
      return 1;
    p++;
  }
  return 0;
}

/* just pick the highest supported samplerate */
static int select_sample_rate(const AVCodec *codec)
{
  const int *p;
  int best_samplerate = 0;

  if (!codec->supported_samplerates)
    return 44100;

  p = codec->supported_samplerates;
  while (*p)
  {
    if (!best_samplerate || abs(44100 - *p) < abs(44100 - best_samplerate))
      best_samplerate = *p;
    p++;
  }
  return best_samplerate;
}

/* select layout with the highest channel count */
static int select_channel_layout(const AVCodec *codec)
{
  const uint64_t *p;
  uint64_t best_ch_layout = 0;
  int best_nb_channels = 0;

  if (!codec->channel_layouts)
    return AV_CH_LAYOUT_STEREO;

  p = codec->channel_layouts;
  while (*p)
  {
    int nb_channels = av_get_channel_layout_nb_channels(*p);

    if (nb_channels > best_nb_channels)
    {
      best_ch_layout = *p;
      best_nb_channels = nb_channels;
    }
    p++;
  }
  return best_ch_layout;
}

void flushEncoderResources(AVCodecContext *c, FILE *in, AVFrame *frame, AVPacket *pkt, AVFormatContext *oc)
{
  if (in != NULL)
  {
    fclose(in);
  }
  if (c != NULL)
  {
    avcodec_free_context(&c);
  }
  if (pkt != NULL)
  {
    av_packet_free(&pkt);
  }
  if (frame != NULL)
  {
    av_frame_free(&frame);
  }
  if (oc != NULL)
  {
    avio_closep(oc->pb);
  }
}

static void encodeAudio(AVCodecContext *ctx, AVFrame *frame, AVPacket *pkt, AVFormatContext *formatContext)
{
  int ret;
  /* send the frame for encoding */
  ret = avcodec_send_frame(ctx, frame);
  if (ret < 0)
  {
    LOG("Error sending the frame to the encoder\n");
    exit(1);
  }

  /* read all the available output packets (in general there may be any
   * number of them */
  while (ret >= 0)
  {
    ret = avcodec_receive_packet(ctx, pkt);
    if (ret == AVERROR(EAGAIN) || ret == AVERROR_EOF)
    {
      return;
    }
    else if (ret < 0)
    {
      fprintf(stderr, "Error encoding audio frame\n");
      exit(1);
    }
    // LOG("write data to output");
    av_interleaved_write_frame(formatContext, pkt);
    // LOG("write data to output ok");
    av_packet_unref(pkt);
  }
}

int encode(const char *inputFile, const char *outFile, const char *callbackId)
{
  const AVCodec *codec;
  AVCodecContext *c = NULL;
  AVFrame *frame;
  int i, j, k, ret;
  FILE *inStream;

  LOG("input %s out: %s callback: %s", inputFile, outFile, callbackId);

  // 查找编码器
  codec = avcodec_find_encoder(AV_CODEC_ID_OPUS);

  if (!codec)
  {
    ret = 1;
    LOG("Codec not found\n %d", AV_CODEC_ID_OPUS);
    goto flush;
  }

  // 创建编码上下文
  c = avcodec_alloc_context3(codec);
  if (!c)
  {
    ret = 2;
    LOG("Could not allocate audio codec context\n %d");
    goto flush;
  }

  // 采样格式
  c->sample_fmt = AV_SAMPLE_FMT_FLTP;
  c->flags |= AV_CODEC_FLAG_GLOBAL_HEADER;
  if (!check_sample_fmt(codec, c->sample_fmt))
  {
    LOG("Encoder does not support sample format %s", av_get_sample_fmt_name(c->sample_fmt));
    goto flush;
  }
  // 比特率
  c->bit_rate = 8000;
  /* select other audio parameters supported by the encoder */
  c->sample_rate = select_sample_rate(codec);
  c->channel_layout = select_channel_layout(codec);
  c->channels = av_get_channel_layout_nb_channels(c->channel_layout);
  c->strict_std_compliance = -2;

  // 打开编码器
  if (avcodec_open2(c, codec, NULL) < 0)
  {
    LOG("Could not open codec\n");
    goto flush;
  }

  AVFormatContext *formatContext;
  ret = avformat_alloc_output_context2(&formatContext, NULL, "ogg", outFile);
  if (ret < 0)
  {
    LOG("avformat_alloc_output_context2 error");
    goto flush;
  }

  AVStream *stream = avformat_new_stream(formatContext, NULL);

  stream->time_base = (AVRational){1, c->sample_rate};

  avcodec_parameters_from_context(stream->codecpar, NULL);

  av_dump_format(formatContext, 0, outFile, 1);

  avio_open(&formatContext->pb, outFile, AVIO_FLAG_WRITE);

  SwrContext *swrContext = swr_alloc_set_opts(
      NULL,
      c->channel_layout,
      c->sample_fmt,
      c->sample_rate,
      2,
      AV_SAMPLE_FMT_S32,
      8000,
      0,
      0);

  swr_init(swrContext);

  // 创建输入输出流
  inStream = fopen(inputFile, "rb");
  if (!inStream)
  {
    LOG("Could not open %s\n", inputFile);
    goto flush;
  }

  /* frame containing input raw audio */
  frame = av_frame_alloc();
  if (!frame)
  {
    LOG("Could not allocate audio frame\n");
    goto flush;
  }

  frame->nb_samples = c->frame_size;
  frame->format = c->sample_fmt;
  frame->channel_layout = c->channel_layout;
  frame->sample_rate = c->sample_rate;

  /* allocate the data buffers */
  ret = av_frame_get_buffer(frame, 0);
  if (ret < 0)
  {
    LOG("Could not allocate audio data buffers\n");
    goto flush;
  }

  int size = c->channels * c->frame_size * av_get_bytes_per_sample(c->sample_fmt);
  uint8_t *buffer = (uint8_t *)malloc(size);
  uint64_t pts = 0;
  if (!buffer)
  {
    LOG("malloc  buffer fail");
  }

  ret = avformat_write_header(formatContext, NULL);

  AVPacket *packet = NULL;
  av_init_packet(packet);

  LOG("nbstreams %d", formatContext->nb_streams);

  packet->stream_index = 0;
  packet->pts = 0;

  while (fread(buffer, 1, size, inStream) > 0)
  {
    ret = av_frame_make_writable(frame);
    if (ret < 0)
    {
      LOG("av_frame_make_writable fail %d", ret);
      goto flush;
    }

    const uint8_t *data[1];
    data[0] = (uint8_t *)buffer;

    ret = swr_convert(swrContext, frame->data, frame->nb_samples, data, frame->nb_samples);

    if (ret < 0)
    {
      LOG("swr_convert error %d", ret);
      goto flush;
    }

    pts += frame->nb_samples;
    frame->pts = pts;

    encodeAudio(c, frame, packet, formatContext);
  }

  ret = av_write_trailer(formatContext);
  LOG("encode success %d", ret);

flush:

  flushEncoderResources(c, inStream, frame, packet, formatContext);

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
         callbackId, outFile, inputFile);

  return ret;
}