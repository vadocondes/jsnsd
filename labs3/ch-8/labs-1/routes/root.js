'use strict'

const url = require('url');

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const { url } = request.query;
    if (url) {
      await reply.from(url);
    } else {
      throw fastify.httpErrors.badRequest();
    }
  })
}
