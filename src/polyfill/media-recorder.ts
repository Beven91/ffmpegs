/**
 * @name H5MediaRecorder
 * @description 媒体录制器，目前主要用来进行音频录制
 */
import polyfill from './api'
import FFAudioWorklet from './audio-worklet'

class H5MediaRecorder implements MediaRecorder {
  private options: MediaRecorderOptions
  private events: DocumentFragment
  private context: AudioContext
  private intervalId: ReturnType<typeof setInterval>
  private worklet: FFAudioWorklet

  stream: MediaStream
  state: RecordingState;
  mimeType: string;
  audioBitsPerSecond: number;
  videoBitsPerSecond: number;

  /**
   * 构建一个MediaRecorder
   * @param stream 媒体流
   * @param options 
   */
  constructor(stream: MediaStream, options?: MediaRecorderOptions) {
    this.stream = stream;
    this.options = options;
    this.events = document.createDocumentFragment();
    this.state = 'inactive';
  }

  start(timeslice?: number): void {
    if (this.state != 'inactive') return;
    this.state = 'recording';
    this.events.dispatchEvent(new Event("start"));
    if (this.context == null) {
      this.context = polyfill.createAudioContext({});
      this.worklet = new FFAudioWorklet(this.context, this.context.createMediaStreamSource(this.stream), 1);
      this.worklet.addEventListener('receive', (blob) => {
        const event = (new Event('dataavailable')) as BlobEvent;
        (event as any).data = blob;
        this.events.dispatchEvent(event);
      });
    }
    if (timeslice > 0) {
      this.intervalId = setInterval(() => this.requestData(), timeslice);
    }
  }

  stop(): void {
    if (this.state == 'inactive') return;
    clearInterval(this.intervalId);
    this.state = "inactive";
    this.requestData();
    this.stream.getTracks().forEach((track) => track.stop());
    this.events.dispatchEvent(new Event("stop"));
    this.worklet.destory();
    this.context.close();
  }

  pause(): void {
    this.state = 'paused';
    this.events.dispatchEvent(new Event("pause"));
  }

  requestData(): void {
    if (this.state == 'recording') {
    }
  }

  resume(): void {
    this.state = 'recording';
    this.events.dispatchEvent(new Event("resume"));
  }

  ondataavailable: (this: MediaRecorder, ev: BlobEvent) => any
  onerror: (this: MediaRecorder, ev: MediaRecorderErrorEvent) => any
  onpause: (this: MediaRecorder, ev: Event) => any
  onresume: (this: MediaRecorder, ev: Event) => any
  onstart: (this: MediaRecorder, ev: Event) => any
  onstop: (this: MediaRecorder, ev: Event) => any

  addEventListener<K extends keyof MediaRecorderEventMap>(type: K, listener: (this: MediaRecorder, ev: MediaRecorderEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type: any, listener: any, options?: any): void {
    this.events.addEventListener(type, listener, options);
  }

  removeEventListener<K extends keyof MediaRecorderEventMap>(type: K, listener: (this: MediaRecorder, ev: MediaRecorderEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
  removeEventListener(type: any, listener: any, options?: any): void {
    this.events.removeEventListener(type, listener, options);
  }

  dispatchEvent(event: Event): boolean {
    return this.events.dispatchEvent(event);
  }

  isTypeSupported(mimeType: string) {
    return true;
  }
}

const MediaRecorder = self.MediaRecorder || H5MediaRecorder;

export default MediaRecorder;