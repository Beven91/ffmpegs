<h1 align="center">FFmpegs</h1>

<div align="center">
一个基于<a href="https://github.com/FFmpeg/FFmpeg">ffmpeg</a>构建在webassembly平台上的轻量级音视频编码与解码工具。
<div style="margin-top:10px">
  <img src="https://img.shields.io/npm/v/ffmpegs.svg">
</div>
</div>

## 特性

- 轻量级,代码体积小。
- 灵活性高，可根据场景选择对应的`wasm`。
- 采用`web-workder`来进行编码与解码不影响主线程
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
npm install ffmpegs
```

```sh
yarn add ffmpegs
```

## 使用

### FFmpegs

> FFmpegs 实例

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
import FFmpegs from 'ffmpegs';
import opusUrl from 'ffmpegs/assembly/opus.wasm';

// initialize....
FFmpegs.AvariableWebAssembies = {
  'opus':opusUrl,
}

// create typed instance
const ffmpegjs = new FFmpegs('opus');
```

> decodeAudioFile

```js
import FFmpegs from 'ffmpegs';

const ffmpegjs = new FFmpegs('opus');

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
import FFmpegs from 'ffmpegs';

const ffmpegjs = new FFmpegs('opus');

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
import FFmpegs from 'ffmpegs';

const ffmpegjs = new FFmpegs('opus');

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
import FFmpegs from 'ffmpegs';

const ffmpegjs = new FFmpegs('opus');

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
import FFmpegs from 'ffmpegs';

// 播放url
const audio = new FFmpegs.Audio('http://xxx.com/demo.opus');

// 播放File对象
const audio2 = new FFmpegs.Audio(file);

document.querySelector('#play').addEventListener('click',()=>{
  // 播放
  audio.play();
});

```

> 属性和方法

| Method Property | Description |
| ---- | ---- |
| play | 播放音频 |
| pause | 暂停播放 |
| close     | 关闭播放器 |
| addEventListener | 添加事件 |
| removeEventListener | 移除事件 |
| currentTime | 获取或者设置当前播放器播放进度 |
| duration | 播放时长 |

> 事件

| Name | Description |
| ---- | ---- |
| play | 当播放音频时触发 |
| pause| 当暂停时触发 |
| progress | 播放进度事件 |
| ended | 播放结束事件 |
| closed | 播放器关闭时触发 |
| error | 播放异常时触发 |
| loadedmetadata | 当元数据加载完成时触发，此时可以获取到正确的`duration` |
| create-context | 自定义创建`AudioContext` |
| node | 当解码数据后切要播放该数据时会创建`AudioBufferSourceNode`节点时触发 |
