'use strict'

const fp = require('fastify-plugin')

/**
 * This plugins adds some utilities to handle http errors
 *
 * 
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(require('@fastify/http-proxy'), {
    upstream: 'https://jsonplaceholder.typicode.com'
  })
})
