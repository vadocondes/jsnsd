'use strict'
const { promisify } = require('util');
const { boat } = require('../../model')
const getBoat = promisify(boat.read)
const createBoat = promisify(boat.create)
const deleteBoat = promisify(boat.del)
const updateBoat = promisify(boat.update)

module.exports = async function (fastify, opts) {
  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params
    try {
      return await getBoat(id)
    } catch (error) {
      if (error.code === 'E_NOT_FOUND'){
        throw fastify.httpErrors.notFound()
      } else {
        throw error
      }
    }
  })

  fastify.delete('/:id', async function (request, reply) {
    const { id } = request.params
    try {
     await deleteBoat(id)
     reply.code(204)
     reply.send()
    } catch (error) {
      if (error.code === 'E_NOT_FOUND'){
        throw fastify.httpErrors.notFound()
      } else {
        throw error
      }
    }
  })

  fastify.put('/:id', async function (request, reply) {
    const { id } = request.params
    const { data } = request.body
    try {
     await updateBoat(id,data)
     reply.code(204)
     reply.send()
    } catch (error) {
      if (error.code === 'E_NOT_FOUND'){
        await createBoat(id,data)
      } else {
        throw error
      }
    }
  })
}
