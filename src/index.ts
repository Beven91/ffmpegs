import AudioAssembly from "./webassembly/AudioAssembly";
import VideoAssembly from "./webassembly/VideoAssembly";

export {
  AudioAssembly,
  VideoAssembly
}

const FFmpegJs = {
  AudioAssembly,
  VideoAssembly
}

export default FFmpegJs;

(window as any).FFmpegJs = FFmpegJs