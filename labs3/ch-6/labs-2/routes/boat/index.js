'use strict'
const { boat } = require('../../model');
const { promisify } = require('util');
const uid = boat.uid;
const getBoat = promisify(boat.read);
const createBoat = promisify(boat.create);
const deleteBoat = promisify(boat.del);


module.exports = async function (fastify, opts) {

  const paramsSchema = {
    id: {
      type: 'integer'
    }
  }

  const bodySchema = {
    type: 'object',
    additionalProperties: false,
    required: ['data'],
    properties: {
      data: {
        type: 'object',
        additionalProperties: false,
        required: ['brand', 'color'],
        properties: {
          brand: {
            type: 'string',
          },
          color: {
            type: 'string'
          }
        }
      }
    }
  }

  

  fastify.get('/:id', {schema: {params: paramsSchema}}, async function (request, reply) {
    const {id} = request.params;
    try {
      return await getBoat(id);
    } catch (error) {
      if (error.code === 'E_NOT_FOUND') {
        throw fastify.httpErrors.notFound();
      } else {
        throw error;
      }
    }
  })

  fastify.post('/', {schema: {body: bodySchema}}, async function (request, reply) {
    const id = uid();
    const { data } = request.body;
    await createBoat(id, data);
    reply.code(201);
    return {id};
  })

  fastify.delete('/:id', {schema: {params: paramsSchema}}, async function (request, reply) {
    const {id} = request.params;
    try {
      await deleteBoat(id);
      reply.code(204);
    } catch (error) {
      if (error.code === 'E_NOT_FOUND') {
        throw fastify.httpErrors.notFound();
      } else {
        throw error;
      }
    }
  })
}
