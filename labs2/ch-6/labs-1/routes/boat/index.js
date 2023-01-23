'use strict'

const model = require('./../../model');
const { promisify }  = require('util');
const uid = model.boat.uid;
const read = promisify(model.boat.read);
const create = promisify(model.boat.create);

module.exports = async function (fastify, opts) {
  const notFound = fastify.httpErrors;
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

  fastify.post('/', async function (request, reply) {
    const { data } = request.body;
    const id =  uid();
    await create(id, data);
    reply.code(201);
    return { id };
  })
}
