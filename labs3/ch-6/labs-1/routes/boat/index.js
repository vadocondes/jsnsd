'use strict'
const { boat } = require('../../model')
const { promisify } = require('util')
const getBoat = promisify(boat.read);
const createBoat = promisify(boat.create);
const uid = boat.uid;


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

  const paramsSchema = {
    id: {
      type: 'integer'
    }
  }

  const schema = {
    body: bodySchema
  }
  

  fastify.get('/:id', { schema: { params: paramsSchema}}, async function (request, reply) {
    const {id} = request.params;
    try {
      return await getBoat(id);
    } catch(err) {
      if (err.code === 'E_NOT_FOUND') {
        throw fastify.httpErrors.notFound();
      } else {
        throw err
      }
    }
  })
  fastify.post('/', {schema}, async function(request, reply) {
    const id = uid();
    const {data} = request.body;
    await createBoat(id, data);
    reply.code(201);
    return {id}
  })
}
