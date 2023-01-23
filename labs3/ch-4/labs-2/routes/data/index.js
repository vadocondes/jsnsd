'use strict'

const stream = require('./../../stream');

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    reply.headers({'content-type': 'text/html' });
    //return stream();
    reply.send(stream());
    // let data = '';
    // for await (const chunk of stream()) {
    //   data+= chunk; 
    // }
    // return data;
  })
}
