'use strict'
const { promisify } = require('util')
const { boat } = require('../../model')
const { uid } = boat
const read = promisify(boat.read)
const create = promisify(boat.create)
const del = promisify(boat.del)

module.exports = async (fastify, opts) => {
  const { notFound } = fastify.httpErrors

  const bodySchema = {
    type: 'object',
    additionalProperties: false,
    required: ['data'],
    properties: {
      data: {
        type: 'object',
        additionalProperties: false,
        required: ['brand','color'],
        properties: {
          brand: {
            type: 'string'
          },
          color:{
            type: 'string'
          }
        }
      }
    }
  }

  fastify.post('/', {schema: { body: bodySchema}}, async (request, reply) => {
    const { data } = request.body
    const id = uid()
    await create(id, data)
    reply.code(201)
    return { id }
  })

  fastify.delete('/:id', async (request, reply) => {
    const { id } = request.params
    try {
      await del(id)
      reply.code(204)
    } catch (err) {
      if (err.message === 'not found') throw notFound()
      throw err
    }
  })

  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params
    try { 
      return await read(id)
    } catch (err) { 
      if (err.message === 'not found') throw notFound()
      throw err
    }
  })
}

