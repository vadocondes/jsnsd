'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const { url } = request.query
    try {
      new URL(url)
    } catch (err) {
      throw fastify.httpErrors.badRequest()
    }
    return reply.from(url, {
      onResponse (request, reply, res) {
        reply.from(url)
      }
    })
  })
}


// const { BICYCLE_SERVICE_PORT, BOAT_SERVICE_PORT } = process.env
// const http = require('http')
// const bicycleSrv = `http://localhost:${BICYLCE_SERVICE_PORT}`
// http.get(`${bicycleSrv}/some/route`, (res) => {
//   /* do something */
// })