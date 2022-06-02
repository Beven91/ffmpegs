const fs = require('fs');

const file = './dist/src/asmlib.template.js';
const id = require.resolve('./dist/audio');
const assemblyAsmlib = require(id);

const code = assemblyAsmlib.toString().split(/\r\n|\n/).join(' ').replace(/\\/g,'\\\\').replace(/'/g,"\\'");
fs.writeFileSync(file, `module.exports = '${code}'`);
fs.unlinkSync(id);