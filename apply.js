const fs = require('fs');

const file = './dist/src/asmlib.template.js';
const assemblyAsmlib = require('./assembly/audio');

const code = assemblyAsmlib.toString().replace(/\n/g,' ').replace(/\\/g,'\\\\').replace(/'/g,"\\'");
fs.writeFileSync(file, `module.exports = '${code}'`);