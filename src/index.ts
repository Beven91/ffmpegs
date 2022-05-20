import AVCodecWebAssembly from './avcodec';
import FFMpegAudioContext from './player/audio';

const FFmpeg = {
  AVCodecWebAssembly,
  FFMpegAudioContext
}

export default FFmpeg;

(self as any).FFMpeg = FFmpeg;
