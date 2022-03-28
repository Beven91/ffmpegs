const play = o => {
  const source = o.context.createBufferSource();
  source.buffer = o.audioBuffer;
  source.connect(o.context.destination);
  source.start();
};

const worker = new Worker("worker.js?v=" + Date.now());

worker.onmessage = function (evt) {
  switch (evt.data.name) {
    case 'callback':
      window[evt.data.id](evt.data.data);
      break;
    case 'message':
      console.log(evt.data.data);
      break;
    case 'alert':
      alert(evt.data.message);
  }
}

document.getElementById('play').onclick = async () => {
  // for (const name of ['valid.wma', 'valid.mp4', 'invalid.aac']) {
  //   await window.decoder.decode({
  //     name,
  //     href: '../inputs/' + name
  //   }).then(o => {
  //     console.log(name, o);
  //     play(o);
  //   }).catch(e => console.error('Decoding Error', e))
  // }
};


function handleAudioFiles(files) {
  var id = 'ffmpeg_callback_' + Date.now();
  window[id] = function (meta) {
    alert('ok');
    const channels = meta.channelsBuffer;
    const context = new AudioContext();
    const audioBuffer = context.createBuffer(meta.channels, channels[0].byteLength / meta.sampleSize, meta.sampleRate);
    channels.forEach((ch, c) => audioBuffer.copyToChannel(ch, c));
    play({
      context,
      audioBuffer,
      meta: Object.assign({}, meta),
    });
  }
  worker.postMessage({ name: 'decode', id: id, file: files[0] });
}


function handleEncoder(files) {
  const file = files[0];
  var id = 'ffmpeg_e_callback_' + Date.now();
  var now = Date.now();
  window[id] = function (res) {
    const ch = res.ch;
    console.log(Date.now() - now);
    if (ch) {
      const blob = new Blob([ch], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = res.out;
      a.click();
    }
  }
  worker.postMessage({ name: 'encode', id: id, file: file });
}