'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const { badRequest } = fastify.httpErrors;
    const { url } = request.query
    try {
      new URL (url);
    } catch (error) {
      throw badRequest();
    }
    return reply.from(url)
  })
}
