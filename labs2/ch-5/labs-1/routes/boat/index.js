'use strict'

const model = require('./../../model');
const { promisify } = require('util');
const getBoat = promisify(model.boat.read);

module.exports = async function (fastify, opts) {
  fastify.get('/:id', async function (request, reply) {

    const { notFound } = fastify.httpErrors;

    const { id } = request.params;
    try {
      return await getBoat(id);
    } catch (error) {
      if (error.code === 'E_NOT_FOUND') {
        throw notFound();
      } else {
        throw error;
      }
    }
  })
}
