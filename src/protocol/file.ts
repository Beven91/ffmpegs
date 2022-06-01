import FFMpegProtocol from './base';

export default class FileProtocol extends FFMpegProtocol<File> {

  protected async doReadInternal() {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        let index = 0;
        const buffer = reader.result as ArrayBuffer;
        const length = buffer.byteLength;
        while (index < length) {
          const data = buffer.slice(index, index + this.minRead);
          this.doReceive(new Uint8Array(data), false);
          index = index + this.minRead;
        }
        this.doReceive(new Uint8Array(), true);
        resolve({});
      }
      reader.readAsArrayBuffer(this.url);
    });
  }
}