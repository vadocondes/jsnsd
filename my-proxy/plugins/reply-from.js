'use strict'

const fp = require('fastify-reply-from')

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(require('fastify-reply-from'), {
    errorHandler: false
  })
})
