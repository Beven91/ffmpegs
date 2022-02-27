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