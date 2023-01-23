'use strict'
const { boat } = require('../../model')
const { promisify } = require('util');
const getBoat = promisify(boat.read);
const createBoat = promisify(boat.create)
const getId = boat.uid

module.exports = async function (fastify, opts) {

  const bodySchema = {
    type: 'object',
    required: ['data'],
    additionalProperties: false,
    properties: {
      data: {
        type: 'object',
        required: ['brand', 'color'],
        additionalProperties: false,
        properties: {
          brand: {
            type: 'string'
          },
          color: {
            type: 'string'
          }
        }
      }
    }
  }

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

  // fastify.post('/', async function (request, reply) { 
  //   const id = getId();
  //   const { data } = request.body
  //   try {
  //     await createBoat(id, data);
  //     reply.code(201)
  //     return { id }
  //   } catch (error) {
  //       throw error  
  //   }
  // })


  fastify.post('/', { schema: { body: bodySchema}},  async function (request, reply) { 
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
}
