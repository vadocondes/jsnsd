'use strict'

const fp = require('fastify-plugin')

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
module.exports = fp(async function (fastify, opts) {
  fastify.addHook('onRequest', async (request, reply) => {
    if (request.ip === '111.34.55.211') {
      throw fastify.httpErrors.forbidden();
    } 
  })
})


