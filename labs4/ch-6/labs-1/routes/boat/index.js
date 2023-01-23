'use strict'
const { boat } = require('../../model')
const { promisify } = require('util');
const getBoat = promisify(boat.read)
const createBoat = promisify(boat.create)
const uid = boat.uid


module.exports = async function (fastify, opts) {
  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params
    try {
      return await getBoat(id)
    } catch (error) {
      if (error.code === 'E_NOT_FOUND') {
        throw fastify.httpErrors.notFound();
      } else {
        throw error
      }
    }
  })

  fastify.post('/', async function (request, reply) {
    const { data } = request.body
    try {
      const id = await createBoat(uid(), data)
      reply.code(201)
      reply.header('content-type', 'application/json' )
      return {id}
    } catch (error) {
        throw error
    }
  })
}
