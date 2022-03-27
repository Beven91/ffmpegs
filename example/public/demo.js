const play = o => {
  const source = o.context.createBufferSource();
  source.buffer = o.audioBuffer;
  source.connect(o.context.destination);
  source.start();
};

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
  const reader = new FileReader();
  const file = files[0];
  reader.onload = function () {
    var buffer = new Uint8Array(this.result);
    var name = file.name;
    var id = 'ffmpeg_callback_' + Date.now();
    FS.writeFile(name, buffer);
    window[id] = function (meta) {
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
    Module.cwrap('decode', 'number', ['string', 'string'])(name, id);
  }
  reader.readAsArrayBuffer(file);
}


function handleEncoder(files) {
  const file = files[0];
  const reader = new FileReader();
  reader.onload = function () {
    var buffer = new Uint8Array(this.result);
    var name = 'demo.pcm';
    var out = 'demo.opus';
    FS.writeFile(name, buffer);
    var id = 'ffmpeg_e_callback_' + Date.now();
    window[id] = function (ch) {
      if (ch) {
        const blob = new Blob([ch], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = out;
        a.click();
      }
    }
    Module.cwrap('encode', 'number', ['string', 'string', 'string', 'string', 'int', 'int'])(name, out, id, 's16', 8000, 2);
  }

  reader.readAsArrayBuffer(file);
}