/**
 * @name web应用程序服务端初始化
 * @description
 */
import { Registry } from 'node-web-mvc';
import path from 'path'

const port = 8899;

Registry.launch({
  port: port,
  resource: {
    gzipped: true,
    mimeTypes: 'application/javascript,text/css,application/wasm',
  },
  hot:{
    cwd:path.join(__dirname)
  },
  cwd: path.join(__dirname, 'controllers'),
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
      .addResourceLocations(
        path.resolve("public"),
        path.resolve("../assembly"),
        path.resolve('../dist'),
        path.resolve(''),
      );
  },
});