import AVCodecWebAssembly from './avcodec';
import Audio from './player/audio';

const FFmpeg = {
  AVCodecWebAssembly,
  Audio
}

export default FFmpeg;

(self as any).FFMpeg = FFmpeg;
