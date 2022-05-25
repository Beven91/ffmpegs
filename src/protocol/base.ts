import { ProtocolReceiveCallback } from "../interface";

export default class FFMpegProtocol<T = any> {

  /**
   * 接受数据回调函数
   */
  protected receiveCallback: ProtocolReceiveCallback

  protected receiveErrorCallback: (ex: Error) => void

  /**
   * 最小接受数据块
   */
  protected minRead: number

  /**
   * 当前资源地址
   */
  protected url: T

  constructor(url: T, minRead: number) {
    this.url = url;
    this.minRead = minRead;
    this.doRead();
  }

  /**
   * 读取异常
   * @param handler 
   */
  onError(handler: (ex: Error) => void) {
    this.receiveErrorCallback = handler;
  }

  /**
   * 当接受到数据
   * @param handler 
   */
  onReceive(handler: ProtocolReceiveCallback) {
    this.receiveCallback = handler;
  }

  /**
   * 执行资源读取
   * @param buffer 
   * @param done 
   */
  protected async doRead(): Promise<any> {
    try {
      await this.doReadInternal();
    } catch (ex) {
      console.error(ex);
      this.receiveErrorCallback && this.receiveErrorCallback(ex);
    }
  }

  /**
   * 读取资源
   */
  protected doReadInternal(): Promise<any> {
    return Promise.resolve({});
  }

  /**
   * 执行数据接受事件
   * @param buffer 
   * @param done 
   */
  protected doReceive(buffer: Uint8Array, done: boolean) {
    this.receiveCallback && this.receiveCallback(buffer, done);
  }
}