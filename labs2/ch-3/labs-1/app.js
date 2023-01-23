'use strict'

const http = require('http');
const { STATUS_CODES } = http;
const url = require('url');
const data = require('./data');

const PORT = process.env.PORT || 3000;

const server = http.createServer( async (req, res) => {

  const { pathname } = url.parse(req.url); 

  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.end(STATUS_CODES[405]);
  } else if (pathname === '/')  {
    res.statusCode = 200;
    res.end(await data());
  } else {
    res.statusCode = 404;
    res.end(STATUS_CODES[404]);
  }
})

server.listen(PORT)