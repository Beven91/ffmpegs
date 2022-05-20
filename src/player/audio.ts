import AVCodecWebAssembly from '../avcodec';

export interface FFMpegAudioContextOptions {
  /**
   * 在读取音频url返回数据时，最小数据块大小
   */
  minRead?: number

  /**
   * 是否预加载
   */
  preload?: boolean
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
  private readonly audioContext: AudioContext

  /**
   * 播放序列
   */
  private playAudioPromise: Promise<void>

  /**
   * 加载序列
   */
  private fetchAudioPromise: Promise<any>

  /**
   * 播放状态
   */
  private status: 'init' | 'stop' | 'playing' | 'close'

  constructor(url: string, options?: FFMpegAudioContextOptions) {
    this.url = url;
    this.options = { ...(options || {}) } as FFMpegAudioContextOptions;
    this.options.minRead = Math.max(this.options.minRead || 0, 12 * 1024);
    this.avcodec = AVCodecWebAssembly.getInstance();
    this.audioContext = new AudioContext({});
    this.playAudioPromise = Promise.resolve();
    this.status = 'init';
    if (this.options.preload) {
      this.fetchAudioStream();
    }
  }

  /**
   * 构造一个支持最小数据块的读取流
   * @param reader 
   * @returns ReadableStream
   */
  private createStream(reader: ReadableStreamDefaultReader<Uint8Array>) {
    return new ReadableStream({
      start: (controller) => {
        let index = -1;
        let buffer: any[] = [];
        const push = () => {
          reader.read().then(async ({ value, done }) => {
            if (done && buffer.length == 0) return;
            controller.enqueue(value);
            buffer = value ? buffer.concat(Array.from(value)) : buffer;
            if (buffer.length < this.options.minRead && !done) {
              return push();
            }
            index++;
            const data = new Uint8Array(buffer);
            buffer.length = 0;
            await (index == 0 ? this.onReceiveHeader(data) : this.onReceive(data));
            push();
          });
        }
        push();
      }
    })
  }

  /**
   * 请求音频url信息
   * @returns 
   */
  private async fetchAudioStream() {
    if (!this.fetchAudioPromise) {
      this.fetchAudioPromise = fetch(this.url).then((response) => {
        const reader = response.body.getReader();
        return new Response(this.createStream(reader), { headers: response.headers });
      });
    }
    return this.fetchAudioPromise;
  }

  /**
   * 当接受到头部数据流
   * @param buffer 
   */
  private onReceiveHeader(buffer: Uint8Array) {
    return this.avcodec.openAudioDecode({ buffer: buffer });
  }

  /**
   * 当接受到数据流
   * @param buffer 接收到的数据块
   */
  private async onReceive(buffer: Uint8Array) {
    const response = await this.avcodec.decodeAudio(buffer);
    const channels = response.channelsBuffer;
    const context = this.audioContext;
    const { sampleRate, sampleSize } = response;
    if (response.channelsBuffer[0]?.byteLength > 0) {
      const audioBuffer = context.createBuffer(response.channels, channels[0].byteLength / sampleSize, sampleRate);
      channels.forEach((ch, c) => audioBuffer.copyToChannel(ch, c));
      this.playBuffer(audioBuffer);
    }
  }

  /**
   * 播放音频buffer
   * @param buffer 
   */
  private playBuffer(buffer: AudioBuffer) {
    const context = this.audioContext;
    this.playAudioPromise = this.playAudioPromise.then(() => {
      return new Promise((resolve) => {
        var source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        source.start();
        source.addEventListener('ended', () => resolve());
      });
    });
  }

  /**
   * 开始播放
   */
  play() {
    this.status = 'playing';
    this.fetchAudioStream();
    this.audioContext.resume();
  }

  /**
   * 暂停播放
   */
  stop() {
    this.status = 'stop';
    this.audioContext.suspend();
  }

  /**
   * 关闭播放器
   */
  close() {
    this.audioContext.close();
    this.status = 'close';
  }
}