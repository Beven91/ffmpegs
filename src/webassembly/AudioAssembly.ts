import { AVDecoderRequest, AVDecoderResponse, OpenAudioDecodeResponse, AVEncoderRequest, AVEncoderResponse, AssemblyResponse } from "../interface";
import WebAssemblyWorker, { WebAssemblyWorkerOptions } from "./WebAssemblyWorker";
import AudioPlayer, { AudioSource, FFMpegAudioContextOptions } from '../player/AudioPlayer';

export default class AudioAssembly extends WebAssemblyWorker {

  constructor(url: string, options?: WebAssemblyWorkerOptions) {
    super({ ...options, uri: url, })
  }

  /**
   * 创建一个音频播放器
   * @param url  音频url
   * @param options  播放设置
   * @returns 
   */
  public createAudioPlayer(url: AudioSource, options: FFMpegAudioContextOptions) {
    const audioPlayer = new AudioPlayer(this, options);
    audioPlayer.src = url;
    return audioPlayer;
  }

  /**
   * 打开音频解码器
   */
  openAudioDecode(options: AVDecoderRequest): Promise<OpenAudioDecodeResponse> {
    return this.invoke('open_audio_decode', options) as Promise<OpenAudioDecodeResponse>;
  }

  /**
   * 解码音频数据，注意调用此函数前，要先调用`openAudioDecode`
   */
  decodeAudio(data: AVDecoderRequest): Promise<AVDecoderResponse> {
    return this.invoke('audio_decode', data) as Promise<AVDecoderResponse>;
  }

  /**
   * 关闭音频解码器
   */
  closeAudioDecode(): Promise<AssemblyResponse> {
    return this.invoke('close_audio_decode');
  }

  /**
   * 解码音频文件
   * @returns 
   */
  decode(file: File): Promise<AVDecoderResponse> {
    return this.invoke('decode', file) as Promise<AVDecoderResponse>;
  }

  /**
   * 编码音频文件
   * @param options 
   * @returns 
   */
  encode(options: AVEncoderRequest): Promise<AVEncoderResponse> {
    return this.invoke('encode', options) as Promise<AVEncoderResponse>;
  }

  /**
   * 打开编码器
   */
  openAudioEncode(options: AVEncoderRequest): Promise<AssemblyResponse> {
    return this.invoke('open_audio_encode', options);
  }

  /**
   * 编码数据
   */
  encodeAudio(buffer: Uint8Array): Promise<AssemblyResponse> {
    return this.invoke('audio_encode', buffer);
  }

  /**
   * 关闭编码器
   */
  closeAudioEncode(): Promise<AVEncoderResponse> {
    return this.invoke('close_audio_encode') as Promise<AVEncoderResponse>;
  }
}