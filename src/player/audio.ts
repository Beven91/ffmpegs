import FFMpegProtocol from '../protocol/base';
import AVCodecWebAssembly from '../index';
import AVEvents from './events';
import loadAvcodecInput from '../protocol';

declare type AudioContextEvent = 'ended' | 'playing' | 'play' | 'pause' | 'closed' | 'error' | 'loadedmetadata' | 'create-context' | 'node';
declare type CancelEvent = () => void

const globalAudioContext = {
  // 当前正在播放的音频实例
  current: null as FFMpegAudioContext
}

export interface FFMpegAudioContextOptions {
  /**
   * 在读取音频url返回数据时，最小数据块大小
   */
  minRead?: number

  /**
   * 是否预加载
   */
  preload?: boolean

  /**
   * 播放模式
   * audio: 传统音频模式，会保留音频流同时可以回放
   * infinite: 无限模式，考虑到内存占用播放的音频流会废弃，不可以回放
   */
  mode: 'audio' | 'infinite'

}

export interface AudioBufferQueue {
  callback: Function
  buffer: AudioBuffer
  done: boolean
}

export interface FFMpegAudioBufferSource {
  done: boolean
  buffer: Uint8Array
}

export interface FFMpegAudioBufferSourceNode {
  done: boolean
  blob: Blob
  channels: number
  byteLength: number
  sampleRate: number
  sampleSize: number
  startTime: number
  endTime: number
}

export default class FFMpegAudioContext {

  /**
   * 当前要播放的音频url
   */
  private readonly url: string

  /**
   * 配置选项
   */
  private readonly options: FFMpegAudioContextOptions

  /**
   * 音频解码器
   */
  private readonly avcodec: AVCodecWebAssembly

  /**
   * 音频播放器
   */
  private audioContext: AudioContext

  /**
   * 播放序列
   */
  private audioBufferQueues: AudioBufferQueue[]

  /**
   * 解码序列
   */
  private promiseAvcodecTasks: Promise<any>

  /**
   * 解码队列长度
   */
  private avcodeTaskCount: number

  /**
   * 当前已解码的数据节点
   */
  private cachedAudioBuffers: FFMpegAudioBufferSourceNode[]

  /**
   * 音频数据流
   */
  private streams: FFMpegProtocol

  /**
   * 事件容器
   */
  private events: AVEvents<AudioContextEvent>

  /**
   * 数据源节点列表
   */
  private segments: FFMpegAudioBufferSource[]

  /**
   * 截止目前当前音频累计时长
   */
  public bufferDuration: number

  /**
   * 目前音频的总时长
   */
  public duration: number

  /**
   * 时间更新计时器id
   */
  private taskIntervalId: any

  /**
   * 当前播放节点下标
   */
  private sourceIndex: number

  /**
   * 是否继续指定任务
   */
  private runKeepping: boolean

  /**
   * 当前正在播放的节点
   */
  private currentSourceNode: AudioBufferSourceNode

  /**
   * 是否解码器已打开
   */
  private isOpenAvcodec: boolean

  /**
   * 是否正在播放中
   */
  private isPlaying: boolean

  /**
   * 是否定位播放
   */
  private seeked: boolean

  /**
   * 重新播放的offset
   */
  private seekOffset: number

  /**
   * 无效累计播放时长
   */
  private unsedDuration: number

  /**
   * 当前播放器状态
   */
  public get state() {
    return this.audioContext.state;
  }

  /**
   * 当前播放时间进度
   * @param url 
   * @param options 
   */
  public get currentTime() {
    return this.audioContext.currentTime - this.unsedDuration;
  }

  /**
   * 设置当前播放开始时间
   */
  public set currentTime(value: number) {
    if (this.options.mode !== 'audio') {
      throw new Error('currentTime can be set in audio mode');
    }
    value = value || 0;
    const source = this.cachedAudioBuffers.find((source) => value <= source.endTime);
    const index = this.cachedAudioBuffers.indexOf(source);
    if (source) {
      this.sourceIndex = index;
      this.runKeepping = true;
      this.seeked = true;
      this.avcodeTaskCount = 0;
      this.audioBufferQueues.length = 0;
      if (this.state == 'suspended') {
        this.audioContext.resume();
      }
      this.unsedDuration = this.audioContext.currentTime - value;
      this.seekOffset = source.endTime - value;
      this.currentSourceNode.buffer = null;
      this.currentSourceNode?.stop();
      this.currentSourceNode?.disconnect();
      this.audioBufferQueues.length = 0;
      this.isPlaying = false;
      this.seekAudioTask();
    }
  }

  constructor(url: string, options?: FFMpegAudioContextOptions) {
    this.url = url;
    this.bufferDuration = 0;
    this.seekOffset = 0;
    this.unsedDuration = 0;
    this.avcodeTaskCount = 0;
    this.sourceIndex = 0;
    this.isOpenAvcodec = false;
    this.segments = [];
    this.audioBufferQueues = [];
    this.cachedAudioBuffers = [];
    this.options = { mode: 'audio', ...(options || {}) } as FFMpegAudioContextOptions;
    this.options.minRead = Math.max(this.options.minRead || 0, 12 * 1024);
    this.avcodec = new AVCodecWebAssembly();
    this.audioBufferQueues.length = 0;
    this.promiseAvcodecTasks = Promise.resolve({});
    this.events = new AVEvents<AudioContextEvent>();
    if (this.options.preload) {
      this.fetchAudio(true);
    }
  }

  /**
   * 请求音频url信息
   * @returns 
   */
  private async fetchAudio(isPreload?: boolean) {
    if (!this.streams) {
      this.streams = loadAvcodecInput(this.url, this.options.minRead);
      this.streams.onError((ex) => {
        this.close();
        this.events.dispatchEvent('error', ex);
      });
      this.streams.onReceive((buffer, done) => {
        if (buffer.length > 0) {
          this.segments.push({ done, buffer });
        } else if (done && this.segments.length > 0) {
          this.segments[this.segments.length - 1].done = true;
        }
      });
    }
    if (!isPreload && !this.taskIntervalId) {
      const interval = 100;
      this.runKeepping = true;
      this.taskIntervalId = setInterval(() => this.processAudioTask(), interval);
    }
  }

  /**
   * 执行音频播放任务
   */
  private async processAudioTask() {
    if (this.state == 'running') {
      this.events.dispatchEvent('playing', this);
    }
    if (!this.runKeepping) {
      return;
    }
    // 一批次最大5个片段
    await this.promiseAvcodecTasks;
    for (let i = 0; i < 5; i++) {
      const source = this.segments.shift();
      this.pushAudioDecodeTask(source);
    }
  }

  /**
   * 添加解码任务
   * @param index 
   */
  private pushAudioDecodeTask(source: FFMpegAudioBufferSource) {
    if (!source) return;
    const header = !this.isOpenAvcodec;
    if (this.isOpenAvcodec) {
      this.avcodeTaskCount++;
    }
    this.isOpenAvcodec = true;
    const buffer = source.buffer;
    this.promiseAvcodecTasks = this.promiseAvcodecTasks.then(() => {
      return header ? this.openAudioDecode(buffer) : this.processAudioDecode(source);
    }).catch((ex) => {
      this.events.dispatchEvent('error', ex);
    });
  }

  /**
   * 打开音频解码器
   * @param buffer 
   * @returns 
   */
  private async openAudioDecode(buffer: Uint8Array) {
    try {
      return await this.avcodec.openAudioDecode({ buffer });
    } catch (ex) {
      this.events.dispatchEvent('error', ex);
      this.close();
      return Promise.reject({});
    }
  }

  /**
   * 解码一段音频为PCM格式
   * @param buffer 接收到的音频数据块
   */
  private async processAudioDecode(source: FFMpegAudioBufferSource) {
    if (!source) return Promise.resolve({});
    const done = source.done;
    const response = await this.avcodec.decodeAudio(source.buffer);
    const channelsBuffers = response.channelsBuffer || [];
    const context = this.audioContext;
    const { sampleRate, sampleSize } = response;
    if (channelsBuffers[0]?.byteLength > 0) {
      const blob = new Blob(channelsBuffers, { type: 'application/octet-stream' });
      const audioBuffer = context.createBuffer(response.channels, channelsBuffers[0].byteLength / sampleSize, sampleRate);
      channelsBuffers.forEach((ch, c) => audioBuffer.copyToChannel(ch, c));
      const endTime = this.bufferDuration + audioBuffer.duration;
      if (this.options.mode == 'audio') {
        this.cachedAudioBuffers.push({
          sampleRate,
          sampleSize,
          blob,
          done,
          channels: response.channels,
          byteLength: channelsBuffers[0].byteLength,
          startTime: this.bufferDuration,
          endTime,
        });
      }
      this.bufferDuration = endTime;
      if (source.done) {
        // 如果结束了，关闭编码器
        this.avcodec.closeAudioDecode();
        this.duration = this.bufferDuration;
        this.events.dispatchEvent('loadedmetadata', this);
      }
      if (!this.seeked) {
        this.pushPlayAudioTask(audioBuffer, done);
      }
    }
  }

  /**
   * 添加播放队列
   * @param no 
   * @returns 
   */
  private pushPlayAudioTask(audioBuffer: AudioBuffer, done: boolean) {
    return new Promise((resolve) => {
      this.audioBufferQueues.push({ done, buffer: audioBuffer, callback: resolve });
      if (!this.isPlaying) {
        this.playAudioTask();
      }
    })
  }

  /**
   * 播放已解码队列的音频数据
   * @param buffer 
   * @returns 
   */
  private async seekAudioTask() {
    const sourceNode = this.cachedAudioBuffers[this.sourceIndex];
    if (sourceNode) {
      const context = this.audioContext;
      const { channels, byteLength, sampleRate, sampleSize } = sourceNode;
      const response = new Response(sourceNode.blob);
      const buffer = await response.arrayBuffer();
      const audioBuffer = context.createBuffer(channels, byteLength / sampleSize, sampleRate);
      for (let i = 0; i < channels; i++) {
        const channelBuffer = new Float32Array(buffer.slice(i * byteLength, i * byteLength + byteLength));
        audioBuffer.copyToChannel(channelBuffer, i)
      }
      await this.pushPlayAudioTask(audioBuffer, sourceNode.done);
      this.seekAudioTask();
    }
  }

  /**
   * 播放音频buffer
   * @param buffer 
   */
  private playAudioTask() {
    if (globalAudioContext.current != this) return;
    this.isPlaying = true;
    const queue = this.audioBufferQueues.shift();
    if (queue) {
      this.currentSourceNode?.stop();
      this.currentSourceNode?.disconnect();
      const context = this.audioContext;
      const source = context.createBufferSource();
      this.currentSourceNode = source;
      source.buffer = queue.buffer;
      source.connect(context.destination);
      source.addEventListener('ended', () => {
        if (source.buffer == null) {
          // 如果时放弃掉的播放，则部响应回调
          return;
        }
        queue.callback && queue.callback();
        this.playAudioTask();
        this.sourceIndex++;
        this.avcodeTaskCount = Math.max(0, this.avcodeTaskCount - 1);
        if (queue.done) {
          this.runKeepping = false;
          this.audioContext.suspend();
          this.events.dispatchEvent('ended');
        }
      });
      if (this.state !== 'running') {
        this.audioContext.resume();
      }
      this.events.dispatchEvent('node', this.audioContext, source);
      source.start(0, this.seekOffset);
      this.seekOffset = 0;
    } else {
      this.isPlaying = false;
    }
  }

  /**
   * 创建AudioContext
   */
  private createAudioContext() {
    if (this.audioContext == null) {
      const results = this.events.dispatchEvent<AudioContext>('create-context', this);
      this.audioContext = results[0] || new AudioContext();
    }
    return this.audioContext;
  }

  /**
   * 开始播放
   */
  play() {
    globalAudioContext.current?.pause();
    this.runKeepping = true;
    this.createAudioContext();
    this.fetchAudio();
    if (this.cachedAudioBuffers.length > 0) {
      this.audioContext.resume();
    }
    globalAudioContext.current = this;
    this.events.dispatchEvent('play', this);
  }

  /**
   * 暂停播放
   */
  pause() {
    this.runKeepping = false;
    this.audioContext.suspend();
    this.events.dispatchEvent('pause', this);
  }

  /**
   * 关闭播放器
   */
  close() {
    this.runKeepping = false;
    clearInterval(this.taskIntervalId);
    this.audioContext.close();
    this.events.dispatchEvent('closed', this);
  }

  /**
   * 通过自定义方式创建播放`AudioContext`
   * 可以用来实现一些播放增强设置
   */
  addEventListener(name: 'create-context', handler: (audio: FFMpegAudioContext) => AudioContext): CancelEvent

  /**
   * 当前播放器在播放解码数据前触发当前事件，
   * 可以通过当前事件获取到即将播放的`AudioBufferSourceNode`
   * @param name 
   * @param handler 
   */
  addEventListener(name: 'node', handler: (source: AudioBufferSourceNode, audioContext: AudioContext) => void): CancelEvent

  addEventListener(name: AudioContextEvent, handler: (audio: FFMpegAudioContext) => void): CancelEvent

  /**
   * 添加事件监听
   */
  addEventListener(name: AudioContextEvent, handler: (...params: any[]) => void): CancelEvent {
    this.events.addEventListener(name, handler);
    return () => {
      this.events.removeEventListener(name, handler);
    }
  }

  /**
   * 移除事件监听
   */
  removeEventListener(name: AudioContextEvent, handler?: () => void) {
    this.events.removeEventListener(name, handler);
  }
}