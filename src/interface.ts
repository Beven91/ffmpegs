import type GetFFMpegAssemblyAdapter from './ffmpeg';
import type { log } from './asmlib';

declare type AssemblyExportKeys = 'decode' | 'open_audio_decode' | 'audio_decode' | 'close_audio_decode' | 'encode' | 'open_audio_encode' | 'audio_encode' | 'close_audio_encode'

export interface AssemblyResponse {
  ret: number
  message: string
  [propName: string]: any
}

export interface AVCodecMetadata {
  /**
   * 输入的源文件内容
   */
  file?: File
  /**
   * 文件名
   */
  name?: string
  /**
   * 采样格式
   */
  format: string

  /**
   * 音频通道数
   */
  channels: number

  /**
   * 采样率
   */
  sampleRate: number

  /**
   * 比特率
   */
  bitRate?: number
}

/**
 * 解码请求信息
 */
export interface AVDecoderRequest {
  /**
   * 使用指定解码器进行解码，默认不推荐使用
   */
  codecId?: number
  /**
   * 音频文件头部数据流，建议获取超过1024个字节
   */
  buffer: Uint8Array
}

/**
 * 解码结果
 */
export interface AVDecoderResponse extends AssemblyResponse {
  /**
   * 编码器名称
   */
  codecName: string

  /**
   * 编码器全名
   */
  codecLongName: string

  /**
   * 编码采样格式
   */
  format: string

  /**
   * 采样率
   */
  sampleRate: number

  /**
   * 采样位深
   */
  sampleSize: number

  /**
   * 音频通道数
   */
  channels: number

  /**
   * 音频通道解码后buffer
   */
  channelsBuffer: Float32Array[]

  /**
   * 输出文件名前缀
   */
  prefix?: string
}

/**
 * 编码请求信息
 */
export interface AVEncoderRequest {
  /**
   * 原始输入音视频编码格式信息
   */
  input: AVCodecMetadata

  /**
   * 编码输出音视频元数据
   */
  output?: AVCodecMetadata
}

/**
 * 编码结果
 */
export interface AVEncoderResponse extends AssemblyResponse {
  name?: string
  /**
   * 音频通道编码后buffer
   */
  data: Uint8Array
}

export interface WorkderRequest<T = any> {
  id?: string
  name?: string
  action: 'init' | AssemblyExportKeys
  debug?: boolean
  data?: T
}

export interface WorkerResponse<T = AssemblyResponse> {
  id: string
  data: T
}

export interface FFmpegAssemblyWrapInstance {
  cwrap?: (name: AssemblyExportKeys, returnType: string, argsType: string[]) => (...params: any[]) => any
  [propName: string]: any
}

export interface FFmepgAssemblyInstance {
  [propName: string]: any
}

export interface AssemblyFS {
  readFile: (name: string) => Uint8Array
  writeFile: (name: string, buffer: Uint8Array) => void
  unlink: (name: string) => void
  streams: Array<{ path: string }>
}

export interface AssemblyWorkerSelf extends Window {
  FS?: AssemblyFS
  FFMpegAssemblyAdapter?: ReturnType<typeof GetFFMpegAssemblyAdapter>,
  log?: typeof log
}

export interface OpenAudioDecodeResponse extends AssemblyResponse {
  /**
   * 去除头部，音频流的起始位置
   */
  start: number
}

export declare type ProtocolReceiveCallback = (buffer: Uint8Array, done: boolean) => void

export interface FFMpegProtocol {

  /**
   * 当接受到数据
   * @param handler 
   */
  onReceive(handler: ProtocolReceiveCallback): void

}