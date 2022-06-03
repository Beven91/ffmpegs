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

### FFmpegJs

> FFmpegJs 实例

| Method | Description |
| ---- | ---- |
| decodeAudioFile | 解码音频文件 |
| encodeAudioFile | 编码音频文件 |
| openAudioDecode | 打开音频解码器 |
| decodeAudio     | `openAudioDecode`后用于解码音频数据 |
| closeAudioDecode| `openAudioDecode`后用于关闭音频解码器 |
| openAudioEncode | 打开音频编码器 |
| encodeAudio     | `openAudioEncode`后用于编码音频数据 |
| closeAudioEncode| `openAudioEncode`后用于关闭音频编码器 |

> 初始化

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

> decodeAudioFile

```js
import FFmpegJs from 'ffmpeg-js';

const ffmpegjs = new FFmpegJs('opus');

const file = files[0];

ffmpegjs.decodeAudioFile(file).then((response)=>{
  // 当前音频编码器名称
  console.log(response.codecName);
  console.log(response.codecLongName);
  // 当前数据编码格式
  console.log(response.format);
  // 采样率
  console.log(response.sampleRate);
  // 采样位深
  console.log(response.sampleSize);
  // 音频通道数字
  console.log(response.channels);
  // 当前解码的个通道的音频数Float32Array
  console.log(response.channelsBuffer)
});

```

> encodeAudioFile

```js
import FFmpegJs from 'ffmpeg-js';

const ffmpegjs = new FFmpegJs('opus');

const pcmfile = files[0];

ffmpegjs.encodeAudioFile(pcmfile).then((response)=>{
  // 编码后的数据Uint8Array
  const data = response.data;
  const blob = new Blob([data], { type: 'application/octet-stream' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'demo.opus';
  a.click();
});
```

> 持续解码

```js
import FFmpegJs from 'ffmpeg-js';

const ffmpegjs = new FFmpegJs('opus');

async function fetchAudio(){
  const response = await fetch('./demo.opus');
  const reader = response.getHeader();

  let partial = await reader.read();
  // 打开解码器
  await ffmpegjs.openAudioDecode({ buffer:partial.value });

  while(!partial.done) {
    partial = await reader.read();
    const data = { done:partial.done,buffer:partial.value };
    // 解码数据
    const result = await ffmpegjs.decodeAudio(data);
    // 播放....
    play(result.channels, result.channelsBuffer);
  }

  // 关闭解码器
  await ffmpegjs.closeAudioDecode();
}
```

> 持续编码

```js
import FFmpegJs from 'ffmpeg-js';

const ffmpegjs = new FFmpegJs('opus');

const data = {
  input: {
    format: 's16',
    sampleRate: 48000,
    channels: 2,
  },
  output: {
    name: 'demo.opus',
    bitRate: 96000
  }
}

// 打开编码器
await ffmpegjs.openAudioEncode(data);

// 编码音频数据
const buffer:Uint8Array;
await ffmpegjs.encodeAudio(buffer);

// 关闭编码
await ffmpegjs.closeAudioEncode();

```

### Audio

另外可以使用内置的`Audio`来进行播放

```js
import FFmpegJs from 'ffmpeg-js';

// 播放url
const audio = new FFmpegJs.Audio('http://xxx.com/demo.opus');

// 播放File对象
const audio2 = new FFmpegJs.Audio(file);

document.querySelector('#play').addEventListener('click',()=>{
  // 播放
  audio.play();
});

```