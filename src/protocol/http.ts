import { FFMpegProtocol, ProtocolReceiveCallback } from "../interface";

export default class HttpProtocol implements FFMpegProtocol {

  minRead: number

  private receiveCallback: ProtocolReceiveCallback

  private streams: ReadableStreamDefaultReader<Uint8Array>

  constructor(minRead: number, url: string) {
    this.minRead = Math.max(minRead || 0, 12 * 1024);
    this.fetchStreams(url)
  }

  private async fetchStreams(url: string) {
    let buffer: any[] = [];
    const response = await fetch(url);
    this.streams = response.body.getReader();
    const read = async () => {
      const response = await this.streams.read();
      buffer = buffer.concat(Array.from(response.value || []));
      if (buffer.length >= this.minRead || response.done) {
        this.receiveCallback && this.receiveCallback(new Uint8Array(buffer), response.done);
        buffer.length = 0;
      }
      if (!response.done) {
        read();
      }
    }
    read();
  }

  onReceive(handler: ProtocolReceiveCallback) {
    this.receiveCallback = handler;
  }
}