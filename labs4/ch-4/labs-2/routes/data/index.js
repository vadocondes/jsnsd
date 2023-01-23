'use strict'

const stream = require('../../stream')

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    reply.headers({'content-type': 'text/html' });
     await reply.send(stream())
  })
}
