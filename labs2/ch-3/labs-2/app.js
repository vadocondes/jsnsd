'use strict'

const http = require('http');
const  { STATUS_CODES } = http;
const url = require('url');
const PORT = process.env.port || 3000;

const server = http.createServer( (req, res) => {
  const { pathname } = url.parse(req.url);
  res.setHeader('Content-Type', 'text/html;charset=utf-8')
  if ( req.method !== 'GET') {
    res.statusCode = 405;
    res.end(STATUS_CODES[res.statusCode]);
  } else if (pathname === '/') {
    res.statusCode = 200;
    res.write('hola máquina', 'utf8');
    res.end();
  } else {
    res.statusCode = 404;
    res.end(STATUS_CODES[res.statusCode]);

  }
})

server.listen(PORT);