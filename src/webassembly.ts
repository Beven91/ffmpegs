import type { AssemblyResponse, AssemblyWorkerSelf, FFmpegAssemblyWrapInstance, WorkderRequest, WorkerResponse } from "./interface";
import { polyfill, createFFmepgAssembly, log } from './asmlib';
import FFMpegAssemblyAdapter from './ffmpeg';

const generate = {
  id: 0
}

/**
 * 当前函数为webassembly在worker中执行的代码
 */
function WebAssemblyWorkerJs() {
  // workder.js 代码内容
  const thisWorker = self as AssemblyWorkerSelf;
  const log = thisWorker.log;
  const origin = thisWorker.locationOrigin;
  const createFFmepgModule = (self as any).createFFmepgModule;
  const fetchedWebAssemblies = {} as Record<string, Promise<WebAssembly.WebAssemblyInstantiatedSource>>;
  const assemblyRuntime = { callback: null as Function, importObject: null as Record<string, any> };

  // 声明包裹实例assemblyInstance
  const assemblyWrapInstance: FFmpegAssemblyWrapInstance = {
    instantiateWasm: (e: any, a: any) => {
      assemblyRuntime.importObject = e;
      assemblyRuntime.callback = a;
    }
  }
  // 初始化assemblyInstance
  createFFmepgModule(assemblyWrapInstance);

  if (!WebAssembly.instantiateStreaming) {
    (WebAssembly as any).instantiateStreaming = (promise: Promise<Response>, importObject: WebAssembly.Imports) => {
      return new Promise<WebAssembly.WebAssemblyInstantiatedSource>(async (resolve, reject) => {
        try {
          const response = await Promise.resolve(promise);
          const buffer = await response.arrayBuffer();
          const wasmModule = await WebAssembly.compile(buffer);
          const instance = await WebAssembly.instantiate(wasmModule, importObject);
          resolve({ instance, module: wasmModule });
        } catch (ex) {
          reject(ex);
        }
      })
    }
  }

  /**
   * 加载指定webassembly
   * @param name webassembly名称
   * @param uri webassembly远程地址
   * @returns Promise
   */
  function fetchWebAssembly(name: string, uri: string): Promise<WebAssembly.WebAssemblyInstantiatedSource> {
    const id = name.toLowerCase();
    if (!fetchedWebAssemblies[id]) {
      const url = /^(http|https)/.test(uri as string) ? uri as string : origin + uri;
      const options = { credentials: "same-origin" } as RequestInit;
      const io = assemblyRuntime.importObject;
      fetchedWebAssemblies[id] = WebAssembly.instantiateStreaming(fetch(url, options), io);
    }
    return fetchedWebAssemblies[id];
  }

  /**
   * 从web worker推送回调给页面
   * @param id 回调函数id标识
   * @param data 回调数据
   */
  function invokeCallback(request: WorkderRequest, data?: AssemblyResponse) {
    return thisWorker.postMessage({ id: request.id, data: data })
  }

  // 监听信息
  thisWorker.addEventListener('message', async (ev: MessageEvent<WorkderRequest>) => {
    const request = ev.data;
    log(request.debug, `>> ${request.action}`, request);
    const assembly = await fetchWebAssembly(request.name, request.data);
    const adapter = new thisWorker.FFMpegAssemblyAdapter(assembly.instance.exports, assemblyWrapInstance, request.idKey, request.debug);
    if (assemblyRuntime.callback) {
      assemblyRuntime.callback(assembly.instance);
      assemblyRuntime.callback = null;
    }
    switch (request.action) {
      case 'init':
        invokeCallback(request, { ret: 0, message: 'ok' });
        log(request.debug, `<< ${request.action} successfully`);
        break;
      default:
        try {
          const response = await Promise.resolve(adapter.proxy(request));
          await adapter.release();
          log(request.debug, `<< ${request.action}`, response);
          invokeCallback(request, response);
        } catch (ex) {
          postMessage({ type: 'error', data: ex.message + '\n' + ex.stack });
          adapter.release();
          invokeCallback(request, { message: ex.message, ret: -1 });
        }
    }
  });
}

/**
 * 根据WebAssemblyWorkerJs代码创建一个web worker来加载webassembly
 */
const blob = new Blob([polyfill, createFFmepgAssembly, `(${FFMpegAssemblyAdapter.toString()}());`, WebAssemblyWorkerJs.toString(), ';WebAssemblyWorkerJs();']);
const assemblyWorker = new Worker(window.URL.createObjectURL(blob));
assemblyWorker.addEventListener('messageerror', (e) => {
  console.error(e);
})
assemblyWorker.addEventListener('message', (response: MessageEvent<WorkerResponse>) => {
  const type = response.data?.type;
  switch (type) {
    case 'log':
      const meta = (response.data as any) as { name: string, params: any[] };
      console.debug(`[ffmpeg-js-worker] ${meta.name}`, ...(meta.params || []));
      break;
    case 'error':
      console.error(response.data?.data);
      break;
  }
})
assemblyWorker.onerror = function (e) {
  console.error(e);
}

export default class WebAssemblyWorker {

  private debug: boolean

  private idKey: number

  /**
   * 当前assembly类型名
   */
  private readonly name: string

  /**
   * 执行worker中assembly函数的回调函数
   */
  private readonly responseCallbacks: Record<string, (data: any) => void>

  /**
   * 加载assembly的Promise
   */
  protected readonly assemblyPromise: Promise<AssemblyResponse>

  /**
   * 构造一个WebAssemlby执行器
   * @param name assembly名称
   */
  constructor(name: string, uri: string, debug: boolean) {
    this.name = name;
    this.responseCallbacks = {};
    this.debug = debug;
    this.idKey = generate.id++;
    assemblyWorker.addEventListener('message', (response: MessageEvent<WorkerResponse>) => {
      const id = response.data?.id;
      const callback = this.responseCallbacks[id];
      delete this.responseCallbacks[id];
      callback && callback(response.data.data);
    });
    log(debug, `initialize assembly: ${name} > ${uri}`)
    this.assemblyPromise = this.invoke({ action: 'init', data: uri });
  }

  /**
   * 执行assembly指定函数
   * @param data 执行参数
   * @returns Promise
   */
  async invoke(data: WorkderRequest): Promise<AssemblyResponse> {
    // 等待初始化结束
    await Promise.resolve(this.assemblyPromise);
    return new Promise((resolve, reject) => {
      const id = Date.now();
      this.responseCallbacks[id] = (data) => {
        data?.ret != 0 ? reject(data) : resolve(data);
      };
      assemblyWorker.postMessage({ ...data, idKey: this.idKey, id, name: this.name, debug: this.debug });
    });
  }
}