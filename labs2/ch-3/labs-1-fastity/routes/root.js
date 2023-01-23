'use strict'

const data = require('./../data')

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const message = await data();
    reply.send(message);
  })
}
