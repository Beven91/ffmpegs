const express = require('express');
const path = require('path');

const server = express();

server.use((req,resp,next)=>{
  resp.setHeader('Cross-Origin-Opener-Policy','same-origin')
  resp.setHeader('Cross-Origin-Embedder-Policy','require-corp')
  next();
});

server.use(express.static(path.resolve('./example/public')))
server.use(express.static(path.resolve('./dist')))



server.listen(8080)