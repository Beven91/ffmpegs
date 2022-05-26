import { AVDecoderRequest, AVDecoderResponse, OpenAudioDecodeResponse, AVEncoderRequest, AVEncoderResponse, AssemblyResponse } from "./interface";
import WebAssemblyWorker from "./webassembly";
import Audio from './player/audio';

export default class AVCodecWebAssembly extends WebAssemblyWorker {

  public static Audio = Audio

  public static AvariableWebAssembies = {
    'opus-pure': '/opus-pure.wasm',
    'opus': '/opus.wasm',
    'daudio': '/daudio.wasm'
  }

  public static defaultAssembly: keyof typeof AVCodecWebAssembly.AvariableWebAssembies

  constructor(type?: keyof typeof AVCodecWebAssembly.AvariableWebAssembies, options?: { debug?: boolean }) {
    type = type || AVCodecWebAssembly.defaultAssembly;
    super(type, AVCodecWebAssembly.AvariableWebAssembies[type], (options || {}).debug);
  }

  /**
   * 打开音频解码器
   */
  openAudioDecode(options: AVDecoderRequest): Promise<OpenAudioDecodeResponse> {
    return this.invoke({ action: 'open_audio_decode', data: options }) as Promise<OpenAudioDecodeResponse>;
  }

  /**
   * 解码音频数据，注意调用此函数前，要先调用`openAudioDecode`
   */
  decodeAudio(buffer: Uint8Array): Promise<AVDecoderResponse> {
    return this.invoke({ action: 'audio_decode', data: buffer }) as Promise<AVDecoderResponse>;
  }

  /**
   * 关闭音频解码器
   */
  closeAudioDecode(): Promise<AssemblyResponse> {
    return this.invoke({ action: 'close_audio_decode', data: null });
  }

  /**
   * 解码音频文件
   * @returns 
   */
  decodeAudioFile(file: File): Promise<AVDecoderResponse> {
    return this.invoke({ action: 'decode', data: file }) as Promise<AVDecoderResponse>;
  }

  /**
   * 编码音频文件
   * @param options 
   * @returns 
   */
  encodeAudioFile(options: AVEncoderRequest): Promise<AVEncoderResponse> {
    return this.invoke({ action: 'encode', data: options }) as Promise<AVEncoderResponse>;
  }

  /**
   * 打开编码器
   */
  openAudioEncode(options: AVEncoderRequest): Promise<AssemblyResponse> {
    return this.invoke({ action: 'open_audio_encode', data: options });
  }

  /**
   * 编码数据
   */
  encodeAudio(buffer: Uint8Array): Promise<AssemblyResponse> {
    return this.invoke({ action: 'audio_encode', data: buffer });
  }

  /**
   * 关闭编码器
   */
  closeAudioEncode(): Promise<AVEncoderResponse> {
    return this.invoke({ action: 'close_audio_encode' }) as Promise<AVEncoderResponse>;
  }
}

(window as any).FFmpegJs = AVCodecWebAssembly;