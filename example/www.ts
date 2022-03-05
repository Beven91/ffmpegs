/**
 * @name web应用程序服务端初始化
 * @description
 */
import { Registry } from 'node-web-mvc';
import path from 'path'

const port = 8080;

Registry.launch({
  port: port,
  resource:{
    gzipped:true,
    mimeTypes:'application/javascript,text/css,application/wasm',
  },
  onLaunch() {
    const url = `http://localhost:${port}`;
    console.log('--------------------------');
    console.log('===> 😊  Starting frontend ...');
    console.log(`===>  Environment: development`);
    console.log(`===>  Listening on port: ${port}`);
    console.log(`===>  Url: ${url}`);
    console.log('--------------------------');
  },
  addInterceptors: (registry) => {
  },
  addResourceHandlers(registry) {
    registry
      .addResourceHandler("/**")
      .addResourceLocations(path.resolve("example/public"), path.resolve("./dist/assets"));
  },
});