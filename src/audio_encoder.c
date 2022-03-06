#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <emscripten.h>

#include <libavcodec/avcodec.h>
#include <libavcodec/codec_id.h>
#include <libavutil/channel_layout.h>
#include <libavutil/common.h>
#include <libavutil/frame.h>
#include <libavutil/samplefmt.h>
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

static void encodeAudio(AVCodecContext *ctx, AVFrame *frame, AVPacket *pkt,
                        FILE *output)
{
  int ret;

  /* send the frame for encoding */
  ret = avcodec_send_frame(ctx, frame);
  if (ret < 0)
  {
    fprintf(stderr, "Error sending the frame to the encoder\n");
    exit(1);
  }

  /* read all the available output packets (in general there may be any
   * number of them */
  while (ret >= 0)
  {
    ret = avcodec_receive_packet(ctx, pkt);
    if (ret == AVERROR(EAGAIN) || ret == AVERROR_EOF)
      return;
    else if (ret < 0)
    {
      fprintf(stderr, "Error encoding audio frame\n");
      exit(1);
    }

    fwrite(pkt->data, 1, pkt->size, output);
    av_packet_unref(pkt);
  }
}

int convertAudio(const char *inputFile, const char *outFile, int bitRate)
{
  const AVCodec *codec;
  AVCodecContext *c = NULL;
  AVFrame *frame;
  AVPacket *pkt;
  int i, j, k, ret;
  FILE *outStream;
  FILE *inStream;
  uint16_t *samples;
  float t, tincr;

  /* find the specity encoder */
  codec = avcodec_find_encoder(AV_CODEC_ID_SPEEX);

  if (!codec)
  {
    LOG("Codec not found\n %d", AV_CODEC_ID_SPEEX);
    exit(1);
  }

  c = avcodec_alloc_context3(codec);
  if (!c)
  {
    fprintf(stderr, "Could not allocate audio codec context\n");
    exit(1);
  }

  /* put sample parameters */
  c->bit_rate = bitRate;

  /* check that the encoder supports s16 pcm input */
  c->sample_fmt = AV_SAMPLE_FMT_S16;
  if (!check_sample_fmt(codec, c->sample_fmt))
  {
    fprintf(stderr, "Encoder does not support sample format %s",
            av_get_sample_fmt_name(c->sample_fmt));
    exit(1);
  }

  /* select other audio parameters supported by the encoder */
  c->sample_rate = select_sample_rate(codec);
  c->channel_layout = select_channel_layout(codec);
  c->channels = av_get_channel_layout_nb_channels(c->channel_layout);

  /* open it */
  if (avcodec_open2(c, codec, NULL) < 0)
  {
    fprintf(stderr, "Could not open codec\n");
    exit(1);
  }

  inStream = fopen(inputFile, "rb");
  outStream = fopen(outFile, "wb");
  if (!inStream)
  {
    fprintf(stderr, "Could not open %s\n", inputFile);
    exit(1);
  }
  if (!outStream)
  {
    fprintf(stderr, "Could not open %s\n", outFile);
    exit(1);
  }

  /* packet for holding encoded output */
  pkt = av_packet_alloc();
  if (!pkt)
  {
    fprintf(stderr, "could not allocate the packet\n");
    exit(1);
  }

  /* frame containing input raw audio */
  frame = av_frame_alloc();
  if (!frame)
  {
    fprintf(stderr, "Could not allocate audio frame\n");
    exit(1);
  }

  frame->nb_samples = c->frame_size;
  frame->format = c->sample_fmt;
  frame->channel_layout = c->channel_layout;

  /* allocate the data buffers */
  ret = av_frame_get_buffer(frame, 0);
  if (ret < 0)
  {
    fprintf(stderr, "Could not allocate audio data buffers\n");
    exit(1);
  }

  int data_size = av_get_bytes_per_sample(c->sample_fmt);

  /* encode data from inputFile */
  while (!feof(inStream))
  {
    /* make sure the frame is writable -- makes a copy if the encoder
     * kept a reference internally */
    ret = av_frame_make_writable(frame);
    if (ret < 0)
    {
      exit(1);
    }
    for (j = 0; j < c->frame_size; j++)
    {
      for (k = 1; k < c->channels; k++)
      {
        fread(frame->data[j] + data_size * i, 1, data_size, inStream);
        encodeAudio(c, frame, pkt, outStream);
      }
    }
  }

  /* flush the encoder */
  encodeAudio(c, NULL, pkt, outStream);

  fclose(outStream);

  av_frame_free(&frame);
  av_packet_free(&pkt);
  avcodec_free_context(&c);

  return 0;
}

int encode(const char *inputFile, const char *outFile, const char *callbackId)
{

  LOG("input %s out: %s callback: %s", inputFile, outFile, callbackId);

  int ret = convertAudio(inputFile, outFile, 64000);

  EM_ASM({
    var callbackId = UTF8ToString($0);
    var callback = window[callbackId];
    var ch = FS.readFile(outFile);
    var buffer = new Float32Array(ch.buffer);
    FS.unlink(outFile);
    FS.unlink(inputFile);
    callback(buffer);
  },
         callbackId);

  return ret;
}