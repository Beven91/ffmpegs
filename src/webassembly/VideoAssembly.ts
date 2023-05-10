import { AVDecoderRequest, AVDecoderResponse, OpenAudioDecodeResponse, AVEncoderRequest, AVEncoderResponse, AssemblyResponse } from "../interface";
import WebAssemblyWorker, { WebAssemblyWorkerOptions } from "./WebAssemblyWorker";

export default class VideoAssembly extends WebAssemblyWorker {

  constructor(url: string, options?: WebAssemblyWorkerOptions) {
    super({ ...options, uri: url, })
  }

  /**
   * 打开视频解码器
   */
  openVideoDecode(options: AVDecoderRequest): Promise<OpenAudioDecodeResponse> {
    return this.invoke('open_video_decode', options) as Promise<OpenAudioDecodeResponse>;
  }

  /**
   * 解码视频数据，注意调用此函数前，要先调用`openAudioDecode`
   */
  decodeVideo(data: AVDecoderRequest): Promise<AVDecoderResponse> {
    return this.invoke('video_decode', data) as Promise<AVDecoderResponse>;
  }

  /**
   * 关闭视频解码器
   */
  closeVideoDecode(): Promise<AssemblyResponse> {
    return this.invoke('close_video_decode');
  }

  /**
   * 解码视频文件
   * @returns 
   */
  decode(file: File): Promise<AVDecoderResponse> {
    return this.invoke('decode', file) as Promise<AVDecoderResponse>;
  }

  /**
   * 编码视频文件
   * @param options 
   * @returns 
   */
  encode(options: AVEncoderRequest): Promise<AVEncoderResponse> {
    return this.invoke('encode', options) as Promise<AVEncoderResponse>;
  }

  /**
   * 打开编码器
   */
  openVideoEncode(options: AVEncoderRequest): Promise<AssemblyResponse> {
    return this.invoke('open_video_encode', options);
  }

  /**
   * 编码数据
   */
  encodeVideo(buffer: Uint8Array): Promise<AssemblyResponse> {
    return this.invoke('video_encode', buffer);
  }

  /**
   * 关闭编码器
   */
  closeVideoEncode(): Promise<AVEncoderResponse> {
    return this.invoke('close_video_encode') as Promise<AVEncoderResponse>;
  }
}