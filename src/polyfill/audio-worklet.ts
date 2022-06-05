
import FFEvents from "./events";

type FFAudioWorkletEvents = 'receive'

export default class FFAudioWorklet {

  private events: FFEvents<FFAudioWorkletEvents>

  private jsNode: ScriptProcessorNode

  constructor(audioContext: AudioContext,streamNode:MediaStreamAudioSourceNode, channels: number) {
    this.events = new FFEvents();
    this.applyLegacy(audioContext,streamNode, channels);
  }

  applyLegacy(audioContext: AudioContext,streamNode:MediaStreamAudioSourceNode, channels: number) {
    this.jsNode = audioContext.createScriptProcessor(4096, channels, channels);
    this.jsNode.addEventListener('audioprocess', (ev) => {
      this.events.dispatchEvent('receive', ev.inputBuffer);
    });
    streamNode.connect(this.jsNode);
    this.jsNode.connect(audioContext.destination);
  }

  addEventListener(name: FFAudioWorkletEvents, handler: (buffer: Float32Array) => void) {
    this.events.addEventListener(name, handler);
  }

  removeEventListener(name: FFAudioWorkletEvents, handler: Function) {
    this.events.removeEventListener(name, handler);
  }

  destory() {
    this.events.removeEventListener('receive');
    this.jsNode.disconnect();
  }
}