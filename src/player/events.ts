
export default class AVEvents<T extends string> {

  private readonly containers: Record<any, Function[]>;

  constructor() {
    this.containers = {} as Record<any, Function[]>;
  }

  /**
   * 添加事件
   * @param name 事件名称
   * @param handler 事件函数
   */
  addEventListener(name: T, handler: Function) {
    const handlers = this.containers[name] = this.containers[name] || [];
    handlers.push(handler);
  }

  /**
   * 执行事件
   * @param name 事件名称
   * @param args 参数信息
   */
  dispatchEvent(name: T, ...args: any[]) {
    const handlers = this.containers[name] || [];
    handlers.forEach((handler) => handler(...args));
  }

  /**
   * 移除事件
   * @param name 事件名称
   * @param handler 事件函数
   */
  removeEventListener(name: T, handler?: Function) {
    const handlers = this.containers[name] || [];
    const index = handlers.indexOf(handler);
    if (handler == undefined) {
      delete this.containers[name];
    } else if (index > -1) {
      handlers.splice(index, 1);
    }
  }
}