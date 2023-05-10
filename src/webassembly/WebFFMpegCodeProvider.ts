import type {
  AssemblyWorkerSelf, OpenAudioDecodeResponse, FFmepgAssemblyInstance,
  FFmpegAssemblyWrapInstance, AVDecoderRequest, WorkderRequest, AVEncoderRequest,
  AssemblyResponse, AVDecoderResponse, AVEncoderResponse
} from "../interface";

export default function WebFFMpegAssemblyCodeProvider() {
  const log = (self as AssemblyWorkerSelf).log;

  class FFMpegAssemblyAdapter {

    private readonly assemblyInstance: FFmepgAssemblyInstance

    private readonly assemblyWrapInstance: FFmpegAssemblyWrapInstance

    private readonly releaseHandlers = [] as Function[]

    private readonly instanceId: number

    private debug: boolean;

    constructor(assemblyInstance: FFmepgAssemblyInstance, assemblyWrapInstance: FFmpegAssemblyWrapInstance, idKey: number, debug: boolean) {
      this.assemblyInstance = assemblyInstance;
      this.assemblyWrapInstance = assemblyWrapInstance;
      this.instanceId = idKey;
      this.debug = debug;
    }

    /**
     * 输出日志
     * @param name 
     * @param params 
     */
    log(name: string, ...params: any[]) {
      log(this.debug, name, ...params);
    }

    /**
     * 文件系统
     */
    get fs() {
      return (self as AssemblyWorkerSelf).FS;
    }

    /**
     * 读取指定文件内容
     * @param name 
     */
    readFile(name: string) {
      const exists = this.fs.streams.find((n) => n?.path == '/' + name);
      if (exists) {
        return this.fs.readFile(name);
      } else {
        return null;
      }
    }

    /**
     * 写入内容到指定位置
     * @param name 文件名
     * @param buffer  H5的File或者Uint8Array
     * @returns 
     */
    async writeFile(name: string, buffer: Blob | Uint8Array) {
      if (buffer instanceof Blob) {
        buffer = await new Promise<Uint8Array>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(new Uint8Array(reader.result as ArrayBuffer));
          reader.onerror = reject;
          reader.readAsArrayBuffer(buffer as Blob);
        })
      }
      this.fs.writeFile(name, buffer);
      this.releaseHandlers.push(() => {
        this.fs.unlink(name);
      });
    }

    /**
     * 解析assembly函数返回结果
     * @param request 
     */
    deserialize<T = AssemblyResponse>(result: string) {
      const meta = {} as any;
      result.split(',').forEach((item) => {
        const kv = item.split(':');
        meta[kv[0].trim()] = kv[1]?.trim();
      });
      return meta as T;
    }

    /**
     * 释放资源
     */
    release() {
      const promise = Promise.all(this.releaseHandlers.map((handler) => handler()));
      this.releaseHandlers.length = 0;
      return promise;
    }

    /**
     * 代理请求
     * @param request 
     * @returns 
     */
    proxy(request: WorkderRequest): AssemblyResponse | Promise<AssemblyResponse> {
      switch (request.action) {
        case 'decode':
          return this.decodeAudioFile(request);
        case 'encode':
          return this.encodeAudioFile(request);
        case 'open_audio_encode':
          return this.openAudioEncode(request);
        case 'audio_encode':
          return this.audioEncode(request);
        case 'close_audio_encode':
          return this.closeAudioEncode(request);
        case 'open_audio_decode':
          return this.openAudioDecode(request);
        case 'audio_decode':
          return this.audioDecode(request);
        case 'close_audio_decode':
          return this.closeAudioDecode(request);
      }
    }

    /**
     * 解码音频文件为pcm格式
     */
    async decodeAudioFile(request: WorkderRequest<File>) {
      const file = request.data;
      const fs = this.fs;
      const name = file.name;
      await this.writeFile(name, file);
      const result = this.assemblyWrapInstance.cwrap('decode', 'string', ['string'])(name);
      const response = this.deserialize<AVDecoderResponse>(result);
      const prefix = response.prefix;
      response.channelsBuffer = [];
      for (let i = 0; i < response.channels; i++) {
        const filename = `${prefix}${i}`;
        const ch = fs.readFile(filename);
        fs.unlink(filename);
        response.channelsBuffer.push(new Float32Array(ch.buffer));
      }
      return response;
    }

    /**
     * 将一个完整pcm音频文件编码为指定格式
     * @param request 
     */
    async encodeAudioFile(request: WorkderRequest<AVEncoderRequest>) {
      const data = request.data;
      const input = data.input;
      const output = data.output;
      const fs = this.fs;
      const name = `audio_${Date.now()}_${input.name || input.file.name}`
      const outpath = `audio_${Date.now()}_${output.name}`;
      const encode = this.assemblyWrapInstance.cwrap('encode', 'string', ['string', 'string', 'string', 'int', 'int', 'int']);
      await this.writeFile(name, input.file);
      const result = encode(name, outpath, input.format, input.sampleRate, input.channels, output.bitRate, output.sampleRate, output.channels);
      const response = this.deserialize<AVEncoderResponse>(result);
      if (response.ret == 0) {
        response.data = fs.readFile(outpath);
        fs.unlink(outpath);
      }
      return response;
    }

    /**
     * 打开音频编码器
     */
    openAudioEncode(request: WorkderRequest<AVEncoderRequest>): AssemblyResponse {
      const { input, output } = request.data as AVEncoderRequest;
      const id = this.instanceId;
      const open = this.assemblyWrapInstance.cwrap('open_audio_encode', 'int', ['int', 'string', 'string', 'int', 'int', 'int']);
      const ret = open(id, output.name, input.format, input.sampleRate, input.channels, output.bitRate);
      return { ret, message: '' };
    }

    /**
     * 编码传入的数据
     * @param request 
     * @returns 
     */
    async audioEncode(request: WorkderRequest<Uint8Array>): Promise<AssemblyResponse> {
      const name = `audio_encode_${Date.now()}.pcm`;
      await this.writeFile(name, request.data);
      const id = this.instanceId;
      const ret = this.assemblyWrapInstance.cwrap('audio_encode', 'int', ['int', 'string'])(id, name);
      return { ret, message: '' };
    }

    /**
     * 关闭概音频编码器，返回截至目前所有编码后的数据
     */
    closeAudioEncode(request: WorkderRequest): AVEncoderResponse {
      const id = this.instanceId;
      const content = this.assemblyWrapInstance.cwrap('close_audio_encode', 'string', ['int', 'string'])(id);
      const response = this.deserialize<AVEncoderResponse>(content);
      response.data = this.readFile(response.name);
      this.fs.unlink(response.name);
      return response;
    }

    /**
     * 打开音频解码器
     */
    async openAudioDecode(request: WorkderRequest<AVDecoderRequest>): Promise<OpenAudioDecodeResponse> {
      const name = `audio_header_${Date.now()}.pcm`;
      await this.writeFile(name, request.data.buffer);
      const id = this.instanceId;
      const content = this.assemblyWrapInstance.cwrap('open_audio_decode', 'string', ['int', 'string'])(id, name);
      const response = this.deserialize<OpenAudioDecodeResponse>(content);
      return response;
    }

    /**
     * 解码传入数据
     */
    async audioDecode(request: WorkderRequest<AVDecoderRequest>): Promise<AVDecoderResponse> {
      const name = `audio_decode_${Date.now()}.pcm`;
      const buffer = request.data.buffer;
      await this.writeFile(name, buffer);
      const id = this.instanceId;
      const end = request.data.done == true ? 1 : 0;
      const content = this.assemblyWrapInstance.cwrap('audio_decode', 'string', ['int', 'string', 'int'])(id, name, end);
      const response = this.deserialize<AVDecoderResponse>(content);
      const prefix = response.prefix;
      response.channelsBuffer = [];
      for (let i = 0; i < response.channels; i++) {
        const filename = `${prefix}${i}`;
        const ch = this.fs.readFile(filename);
        this.fs.unlink(filename);
        response.channelsBuffer.push(new Float32Array(ch.buffer));
      }
      return response;
    }

    /**
     * 关闭音频解码器
     */
    closeAudioDecode(request: WorkderRequest): AssemblyResponse {
      const id = this.instanceId;
      const ret = this.assemblyWrapInstance.cwrap('close_audio_decode', 'int', ['int'])(id);
      return { ret, message: '', data: null };
    }
  }

  (self as any).FFMpegAssemblyAdapter = FFMpegAssemblyAdapter;

  return FFMpegAssemblyAdapter;
}