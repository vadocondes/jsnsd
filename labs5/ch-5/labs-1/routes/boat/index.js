'use strict'
const { boat } = require('../../model')
const { promisify } = require('util');
const getBoat = promisify(boat.read);

module.exports = async function (fastify, opts) {
  const paramsSchema = {
    id: {
      type: 'integer'
    }
  }

  /*
  fastify.get('/:id', {schema: { params: paramsSchema}}, async function (request, reply) {
    const { id } = request.params
    // if (isNaN(Number(id))) {
    //   throw fastify.httpErrors.badRequest()
    // } else {
      try {
        return await getBoat(id)
      } catch (error) {
        if (error.code === 'E_NOT_FOUND') {
          throw fastify.httpErrors.notFound()
        } else {
          throw error
        }
      }
    // }
  })
*/

  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params
    // if (isNaN(Number(id))) {
    //   throw fastify.httpErrors.badRequest()
    // } else {
      try {
        return await getBoat(id)
      } catch (error) {
        if (error.code === 'E_NOT_FOUND') {
          throw fastify.httpErrors.notFound()
        } else {
          throw error
        }
      }
    // }
  })
}
