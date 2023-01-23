'use strict'

const { boat } = require('../../model');
const { promisify } = require('util');
const getBoat = promisify(boat.read);


module.exports = async function (fastify, opts) {

  const paramsSchema = {
    id: { type: 'integer'}
  }
  const schema = {
    params: paramsSchema
  }
  

  fastify.get('/:id',

  async function (request, reply) {
    const { id } = request.params;
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
}
