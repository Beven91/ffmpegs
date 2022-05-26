import FFMpegProtocol from './base';

export default class FileProtocol extends FFMpegProtocol<File> {

  protected async doReadInternal() {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        const buffer = reader.result as ArrayBuffer;
        const header = buffer.slice(0, this.minRead);
        const body = buffer.slice(this.minRead);
        this.doReceive(new Uint8Array(header), false);
        this.doReceive(new Uint8Array(body), true);
        resolve({});
      }
      reader.readAsArrayBuffer(this.url);
    });
  }
}