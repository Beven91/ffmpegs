#include <stdio.h>
#include <libavformat/avformat.h>
#include <libavcodec/avcodec.h>
#include "./util.c"

#define C_CAST(type, variable) ((type)variable)
#define REINTERPRET_CAST(type, variable) C_CAST(type, variable)
#define STATIC_CAST(type, variable) C_CAST(type, variable)
#define RAW_OUT_ON_PLANAR 0

FILE **outFiles;

float getSample(const AVCodecContext *codecCtx, uint8_t *buffer, int sampleIndex)
{
  int64_t val = 0;
  float ret = 0;
  int sampleSize = av_get_bytes_per_sample(codecCtx->sample_fmt);
  switch (sampleSize)
  {
  case 1:
    // 8bit samples are always unsigned
    val = REINTERPRET_CAST(uint8_t *, buffer)[sampleIndex];
    // make signed
    val -= 127;
    break;

  case 2:
    val = REINTERPRET_CAST(int16_t *, buffer)[sampleIndex];
    break;

  case 4:
    val = REINTERPRET_CAST(int32_t *, buffer)[sampleIndex];
    break;

  case 8:
    val = REINTERPRET_CAST(int64_t *, buffer)[sampleIndex];
    break;

  default:
    LOG("invalid sample size");
    return 0;
  }

  // Check which data type is in the sample.
  switch (codecCtx->sample_fmt)
  {
  case AV_SAMPLE_FMT_U8:
  case AV_SAMPLE_FMT_S16:
  case AV_SAMPLE_FMT_S32:
  case AV_SAMPLE_FMT_U8P:
  case AV_SAMPLE_FMT_S16P:
  case AV_SAMPLE_FMT_S32P:
    // integer => Scale to [-1, 1] and convert to float.
    ret = val / STATIC_CAST(float, ((1 << (sampleSize * 8 - 1)) - 1));
    break;

  case AV_SAMPLE_FMT_FLT:
  case AV_SAMPLE_FMT_FLTP:
    // float => reinterpret
    ret = *REINTERPRET_CAST(float *, &val);
    break;

  case AV_SAMPLE_FMT_DBL:
  case AV_SAMPLE_FMT_DBLP:
    // double => reinterpret and then static cast down
    ret = STATIC_CAST(float, *REINTERPRET_CAST(double *, &val));
    break;

  default:
    LOG("invalid sample format");
    return 0;
  }
  return ret;
}

int receiveFrame(AVCodecContext *codecCtx, AVFrame *frame)
{
  int err = 0;
  // Read the packets from the decoder.
  // NOTE: Each packet may generate more than one frame, depending on the codec.
  while ((err = avcodec_receive_frame(codecCtx, frame)) == 0)
  {
    if (av_sample_fmt_is_planar(codecCtx->sample_fmt) == 1)
    {
      // This means that the data of each channel is in its own buffer.
      // => frame->extended_data[i] contains data for the i-th channel.
      for (int s = 0; s < frame->nb_samples; ++s)
      {
        for (int c = 0; c < codecCtx->channels; ++c)
        {
          float sample = getSample(codecCtx, frame->extended_data[c], s);
          fwrite(&sample, sizeof(float), 1, outFiles[c]);
        }
      }
    }
    else
    {
      // This means that the data of each channel is in the same buffer.
      // => frame->extended_data[0] contains data of all channels.
      if (RAW_OUT_ON_PLANAR)
      {
        fwrite(frame->extended_data[0], 1, frame->linesize[0], outFiles[0]);
      }
      else
      {
        for (int s = 0; s < frame->nb_samples; ++s)
        {
          for (int c = 0; c < codecCtx->channels; ++c)
          {
            float sample = getSample(codecCtx, frame->extended_data[0], s * codecCtx->channels + c);
            fwrite(&sample, sizeof(float), 1, outFiles[c]);
          }
        }
      }
    }
    // Free any buffers and reset the fields to default values.
    av_frame_unref(frame);
  }
  return err;
}

void flushResources(AVFormatContext *formatCtx, AVCodecContext *codecCtx, AVFrame *frame)
{
  LOG("Flush start...");
  if (frame != NULL)
  {
    av_frame_free(&frame);
  }
  if (formatCtx != NULL)
  {
    avformat_close_input(&formatCtx);
    avformat_free_context(formatCtx);
  }
  if (codecCtx != NULL)
  {
    // drainDecoder(codecCtx, frame);
    avcodec_close(codecCtx);
    avcodec_free_context(&codecCtx);
    for (int i = 0; i < codecCtx->channels; i++)
    {
      fclose(outFiles[i]);
    }
  }
  LOG("Flush end");
}

int decode(const char *filename, const char *callbackId)
{
  int ret = 0;
  int streamIndex = -1;
  AVFormatContext *formatCtx = NULL;
  AVCodecContext *codecCtx = NULL;
  AVFrame *frame = NULL;

  LOG("input: %s, id: %s", filename, callbackId);

  // 1. 打开指定文件
  ret = avformat_open_input(&formatCtx, filename, NULL, 0);
  if (ret < 0)
  {
    LOG("cannot open file: %d  %s", ret, filename);
    goto flush;
  }

  // 2.读取部分帧，用于补偿格式推敲
  avformat_find_stream_info(formatCtx, NULL);

  // 3.查找第一个数据流的下标
  for (size_t i = 0; i < formatCtx->nb_streams; ++i)
  {
    if (formatCtx->streams[i]->codecpar->codec_type == AVMEDIA_TYPE_AUDIO)
    {
      streamIndex = i;
      break;
    }
  }

  if (streamIndex == -1)
  {
    ret = 2;
    LOG("none of the available streams are audio streams");
    goto flush;
  }

  // 4. 查找对应解码器
  const AVCodec *codec = avcodec_find_decoder(formatCtx->streams[streamIndex]->codecpar->codec_id);

  if (codec == NULL)
  {
    ret = 3;
    LOG("not supported codec: %s", formatCtx->streams[streamIndex]->codecpar->codec_id);
    goto flush;
  }

  // 5. 分配解码上下文
  codecCtx = avcodec_alloc_context3(codec);
  if (codecCtx == NULL)
  {
    ret = 4;
    LOG("could not allocate a decoding context");
    goto flush;
  }

  if (avcodec_parameters_to_context(codecCtx, formatCtx->streams[streamIndex]->codecpar) != 0)
  {
    ret = 5;
    LOG("cannot set codec context parameters");
    goto flush;
  }

  codecCtx->request_sample_fmt = av_get_alt_sample_fmt(codecCtx->sample_fmt, 0);

  // Initialize the decoder.
  if (avcodec_open2(codecCtx, codec, NULL) != 0)
  {
    ret = 6;
    LOG("cannot initialize the decoder");
    goto flush;
  }

  // initialize output files; each file stores PCM data of its channel
  outFiles = malloc(codecCtx->channels * sizeof(FILE *));
  for (int c = 0; c < codecCtx->channels; ++c)
  {
    char name[20];
    sprintf(name, "channel_%d", c);
    outFiles[c] = fopen(name, "w+");
  }

  if ((frame = av_frame_alloc()) == NULL)
  {
    ret = 7;
    LOG("cannot allocate frame");
    goto flush;
  }

  // Prepare the packet.
  AVPacket *packet = av_packet_alloc();

  while ((ret = av_read_frame(formatCtx, packet)) != AVERROR_EOF)
  {
    if (ret != 0)
    {
      break; // Don't return, so we can clean up nicely.
    }
    // Does the packet belong to the correct stream?
    if (packet->stream_index != streamIndex)
    {
      // Free the buffers used by the frame and reset all fields.
      av_packet_unref(packet);
      continue;
    }
    // We have a valid packet => send it to the decoder.
    if ((ret = avcodec_send_packet(codecCtx, packet)) == 0)
    {
      // The packet was sent successfully. We don't need it anymore.
      // => Free the buffers used by the frame and reset all fields.
      av_packet_unref(packet);
    }
    else
    {
      // Something went wrong.
      // EAGAIN is technically no error here but if it occurs we would need to buffer
      // the packet and send it again after receiving more frames. Thus we handle it as an error here.
      break; // Don't return, so we can clean up nicely.
    }

    // Receive and handle frames.
    // EAGAIN means we need to send before receiving again. So thats not an error.
    if ((ret = receiveFrame(codecCtx, frame)) != AVERROR(EAGAIN))
    {
      // Not EAGAIN => Something went wrong.
      break; // Don't return, so we can clean up nicely.
    }
  }

flush:

  flushResources(formatCtx, codecCtx, frame);

  char szBuffer[1024] = {0};
  av_strerror(ret, szBuffer, 1024);
  LOG(szBuffer);

  EM_ASM({
    var data = {};
    var scope = typeof window == 'object' ? window : self;
    var callbackId = UTF8ToString($0);
    var codecId = $1;
    var callback = scope[callbackId];
    data.codecName = UTF8ToString($2);
    data.codecLongName = UTF8ToString($3);
    data.streamIndex = $4;
    data.sampleFormat = UTF8ToString($5);
    data.sampleRate = $6;
    data.sampleSize = $7;
    data.channels = $8;
    data.channelsBuffer = [];
    for (var i = 0; i < data.channels; i++)
    {
      var filename = 'channel_' + i;
      var ch = FS.readFile(filename);
      FS.unlink(filename);
      data.channelsBuffer.push(new Float32Array(ch.buffer));
    }
    callback(data);
  },
         callbackId, codec != NULL ? codec->id : 0, codec != NULL ? codec->name : NULL, codec != NULL ? codec->long_name : NULL, streamIndex, codecCtx != NULL ? av_get_sample_fmt_name(codecCtx->sample_fmt) : NULL, codecCtx != NULL ? codecCtx->sample_rate : 0, codecCtx != NULL ? av_get_bytes_per_sample(codecCtx->sample_fmt) : 0, codecCtx != NULL ? codecCtx->channels : 0);

  return ret;
}