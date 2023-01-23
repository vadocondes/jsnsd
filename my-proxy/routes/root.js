'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const { url } = request.params;
    const { badRequest } = fastify.httpErrors;
    try {
      new URL(url);
      
    } catch (error) {
        throw badRequest();
    }
    return reply.from(url);
  })
}
