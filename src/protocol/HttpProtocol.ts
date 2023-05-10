import FFMpegProtocol from './BaseProtocol';

export default class HttpProtocol extends FFMpegProtocol<string> {

  buffer = [] as any[]

  async read(streams: ReadableStreamDefaultReader<Uint8Array>) {
    const response = await streams.read();
    this.buffer = this.buffer.concat(Array.from(response.value || []));
    if (this.buffer.length >= this.minRead || response.done) {
      this.doReceive(new Uint8Array(this.buffer), response.done);
      this.buffer.length = 0;
    }
    if (!response.done) {
      this.read(streams);
    }
  }

  async doReadInternal() {
    const response = await fetch(this.url);
    const streams = response.body.getReader();
    return this.read(streams);
  }
}