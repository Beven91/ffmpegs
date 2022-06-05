
var AudioContext = window.AudioContext || window.webkitAudioContext;
var type = 'opus';
// var type = 'audio-pure';
var runtimeAudio = {};
var audioContext = new AudioContext();
var ffmpegPlayer = null;
var ffmpegPlayer2 = null;
var ffmpeg = new FFmpegJs(type, { debug: true });
// 设置默认assembly
FFmpegJs.defaultAssembly = type;

function playAudioBuffer(meta) {
  var channelsBuffer = meta.channelsBuffer;
  var sampleSize = meta.sampleSize;
  var sampleRate = meta.sampleRate;
  if (channelsBuffer[0].byteLength == 0) {
    return Promise.resolve({});
  }
  var audioBuffer = audioContext.createBuffer(meta.channels, channelsBuffer[0].byteLength / sampleSize, sampleRate);
  channelsBuffer.forEach(function (ch, c) {
    audioBuffer.copyToChannel(ch, c)
  });
  return new Promise(function (resolve) {
    var source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();
    source.onended = resolve;
  });
}

function decodeAudioFile(files) {
  ffmpeg.decodeAudioFile(files[0]).then(playAudioBuffer);
}

function decodeAudioFilePlay(files) {
  const player = new FFmpegJs.Audio(files[0], { debug: true,minRead:12 * 1024 });
  player.play();
}

function decodeAudio2() {
  ffmpegPlayer2.play();
}

function decodeAudio() {
  var url = type == 'opus-pure' ? '/pure.opus' : 'normal.opus';
  ffmpegPlayer = new FFmpegJs.Audio(url,{ debug:true });
  ffmpegPlayer.addEventListener('play', () => console.log('play audio'));
  ffmpegPlayer.addEventListener('pause', () => console.log('pause audio'));
  ffmpegPlayer.addEventListener('progress', (ctx) => console.log('playing:' + ctx.currentTime));
  ffmpegPlayer.addEventListener('ended', () => console.log('play audio ended'));
  ffmpegPlayer.addEventListener('close', () => console.log('audio closed'));
  ffmpegPlayer.play();
  if (ffmpegPlayer2 == null) {
    ffmpegPlayer2 = ffmpegPlayer;
  }
}

function stopAudio(isPlay2) {
  if (isPlay2) {
    return ffmpegPlayer2 && ffmpegPlayer2.pause();
  }
  ffmpegPlayer && ffmpegPlayer.pause();
}

function continueAudio(isPlay2) {
  if (isPlay2) {
    return ffmpegPlayer2 && ffmpegPlayer2.play();
  }
  ffmpegPlayer && ffmpegPlayer.play();
}

function seekAudio(isPlay2) {
  ffmpegPlayer && (ffmpegPlayer.currentTime = 5);
}

function readFile(file) {
  return new Promise(function (resolve) {
    var reader = new FileReader();
    reader.onload = function () { resolve(reader.result); }
    reader.readAsArrayBuffer(file);
  })
}

function handleEncoder(files) {
  var file = files[0];
  var options = {
    input: {
      file: file,
      format: 's16',
      sampleRate: 48000,
      channels: 2,
    },
    output: {
      name: 'demo.opus',
      bitRate: 96000
    }
  }
  ffmpeg.encodeAudioFile(options).then(onEncodeCompleted);
}

function onEncodeCompleted(response) {
  if (response.data) {
    var ch = response.data;
    var blob = new Blob([ch], { type: 'application/octet-stream' });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'demo.opus';
    a.click();
  }
}

function handleEncoder2(files) {
  var file = files[0];
  var options = {
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
  readFile(file).then(function (buffer) {
    ffmpeg.openAudioEncode(options).then(function (ret) {
      var ch = buffer.slice(0, 4000000);
      ffmpeg.encodeAudio(new Uint8Array(ch)).then(function () {
        ffmpeg.closeAudioEncode().then(onEncodeCompleted);
      })
    });

  });
}

let myStream = null;
  const chunks = [];
  
function startRecord(){
  
  navigator.mediaDevices.getUserMedia({ audio:true }).then((stream)=>{

    myStream = stream;
    const context = new AudioContext({ sampleRate:48000 });
    stream.getAudioTracks()[0].applyConstraints({
      sampleRate:48000,
    }).then(()=>{
      const m = context.createMediaStreamSource(stream);
      const jsNode = context.createScriptProcessor();
      m.connect(jsNode);
      jsNode.connect(context.destination);
      jsNode.addEventListener('audioprocess',(d)=>{
        const a = d.inputBuffer.getChannelData(0);
        const b = d.inputBuffer.getChannelData(1);
        chunks.push(a);
        chunks.push(b);

      })
    })
  })

}

function stopRecord(){
  myStream.getAudioTracks()[0].stop();
  var blob = new Blob(chunks, { type: 'application/octet-stream' });
  var url = window.URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'aaa.webm';
  a.click();

}