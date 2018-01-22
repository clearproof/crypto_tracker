const path = require('path');
const compression = require('compression');
const express = require('express');
const server = express();
server.use(compression({level: 9}));

const cacheTime = 86400000*7;     // 7 days
server.use(express.static(path.resolve('dist'),{ maxAge: cacheTime }) );

server.get('/', function (req, res) {
  res.sendFile(path.resolve('dist/index.html'));
});
console.log("Server listen on : http://127.0.0.1:3000");
server.listen(3000);