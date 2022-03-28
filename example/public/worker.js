
var global = self;

importScripts('ffmpeg.js?v=' + Date.now());

this.onmessage = function (evt) {
  console.log(`子线程Reveived msg: ${evt.data}`)
  switch (evt.data.name) {
    case 'init':
      self.test.init();
      break;
    case 'encode':
      encode(evt.data);
      break;
    case 'decode':
      decode(evt.data);
    default:
      break;
  }
}

function decode(data) {
  const reader = new FileReader();
  const file = data.file;
  reader.onload = function () {
    var buffer = new Uint8Array(this.result);
    var name = file.name;
    var id = data.id;
    FS.writeFile(name, buffer);
    global[id] = function (res) {
      global.postMessage({ name: 'callback', id: id, data: res });
    }
    Module.cwrap('decode', 'number', ['string', 'string'])(name, id);
    global.postMessage({ name: 'alert', message:'ssssssss' });
  }
  reader.readAsArrayBuffer(file);
}

function encode(data) {
  const file = data.file;
  const id = data.id;
  const reader = new FileReader();
  console.log('global', this);
  reader.onload = function () {
    var name = 'demo.pcm';
    var out = 'demo.opus';
    var buffer = new Uint8Array(this.result);
    FS.writeFile(name, buffer);
    global[id] = function (buffer) {
      global.postMessage({ name: 'callback', id: id, data: { ch: buffer, out: out } });
    }
    Module.cwrap('encode', 'number', ['string', 'string', 'string', 'string', 'int', 'int', 'int'])(name, out, id, 's16', 8000, 2);
  }

  reader.readAsArrayBuffer(file);
}