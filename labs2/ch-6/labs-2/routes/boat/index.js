'use strict'

const model = require('../../model')
const { promisify } = require('util');
const read = promisify(model.boat.read);
const remove = promisify(model.boat.del);


module.exports = async function (fastify, opts) {
  const { notFound } = fastify.httpErrors;
  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params;
    try {
      return await read(id);
    } catch (error) {
      if (error.code === 'E_NOT_FOUND') {
        throw notFound();
      } else {
        throw error;
      }
    }
  })

  fastify.delete('/:id', async function (request, reply) {
    const { id } = request.params;
    try {
      reply.code(204);
      return await remove(id);
    } catch (error) {
      if (error.code === 'E_NOT_FOUND') {
        throw notFound();
      } else {
        throw error;
      }
    }
  })
}
