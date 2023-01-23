'use strict'
const { boat } = require('../../model')
const { promisify } = require('util');
const getBoat = promisify(boat.read);
const createBoat = promisify(boat.create)
const removeBoat = promisify(boat.del)
const getId = boat.uid

module.exports = async function (fastify, opts) {

  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params
    try {
      return await getBoat(id)
    } catch (error) {
      if (error.code === 'E_NOT_FOUND') {
        throw fastify.httpErrors.notFound()
      } else {
        throw error
      }
    }
  })

  fastify.post('/', async function (request, reply) { 
    const id = getId();
    const { data } = request.body
    try {
      await createBoat(id, data);
      reply.code(201)
      return { id }
    } catch (error) {
        throw error  
    }
  })

  fastify.delete('/:id', async function (request, reply) {
    const { id } = request.params
    try {
      reply.code(204)
      return await removeBoat(id)
    } catch (error) {
      if (error.code === 'E_NOT_FOUND') {
        throw fastify.httpErrors.notFound()
      } else {
        throw error
      }
    }
  })



}
