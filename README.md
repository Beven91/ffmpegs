<h1 align="center">FFmpegJs</h1>

<div align="center">
一个基于<a href="https://github.com/FFmpeg/FFmpeg">ffmpeg</a>构建在webassembly平台上的轻量级音视频编码与解码工具。
</div>

## 特性

- 轻量级,代码体积小。
- 灵活性高，可根据场景选择对应的`wasm`。
- 采用`web-workder`来进行编码与解码不影响`主线程`
- 方便易用，采用统一api来完成不同场景的`wasm`的调用。

## 环境支持

> PC

| Edge | Firefox | Chrome | Safari | Opera |
| ---- | ---- | ---- | ---- | ---- |
| 16+ | 52+ | 57+ | 11+ | 44+ |

> Mobile WebView

| WeChat | Android | iOS | QQ | UC | BaiDu |
| ---- | ---- | ---- | ---- | ---- | ---- | 
| 7.0.1 + | 5.1+ | 11+ | 10.4+ | 不支持 | 不支持 |

## 支持场景

| Name  | GZIP | Decoders | Encoders  | File |
| ----  | ---- | ---- | ---- | ---- |
| opus-pure  | 194KB | opus | opus | assembly/opus-pure.wasm |
| opus  | 393KB | ogg(opus) | ogg(opus) | assembly/opus.wasm |
| daudio | 513KB | mp3,aac,mov,ogg(opus) | - | assembly/daudio.wasm |

## 安装

```sh
npm install ffmpeg-js
```

```sh
yarn add ffmpeg-js
```

## 使用

> initialize

```js
import FFmpegJs from 'ffmpeg-js';
import opusUrl from 'ffmpeg-js/assembly/opus.wasm';

// initialize....
FFmpegJs.AvariableWebAssembies = {
  'opus':opusUrl,
}

// create typed instance
const ffmpegjs = new FFmpegJs('opus');
```

> decode

```js


```



