'use strict'

const { boat } = require('../../model');
const { promisify } = require('util');
const getBoat = promisify(boat.read);

module.exports = async function (fastify, opts) {
  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params;
    try {
      return await getBoat(id);
    } catch (error) {
      if (error.code === 'E_NOT_FOUND') {
        throw fastify.httpErrors.notFound()
      } else {
        throw error
      }
    }
  })
}
