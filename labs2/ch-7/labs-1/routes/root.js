'use strict'
const url = require('url');
const got = require('got');

const {
  BOAT_SERVICE_PORT = 3001,
  BRAND_SERVICE_PORT = 4000
} = process.env;


module.exports = async function (fastify, opts) {
  const { notFound, badRequest, serviceUnavailable } = fastify.httpErrors
  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params;
    try {
      const boat = await got(`http://localhost:${BOAT_SERVICE_PORT}/${id}`, {timeout: 600, retry:0}).json();
      const brand = await got(`http://localhost:${BRAND_SERVICE_PORT}/${boat.brand}`, {timeout: 600, retry:0}).json();
      
      return {
        id: boat.id,
        color: boat.color,
        brand: brand.name
      }

    } catch (error) {
      if (error.code === 'ECONNREFUSED'){
        throw serviceUnavailable();
      }
      else if (!error.response) {
        throw error;
      } else if (error.response.statusCode === 404) {
        throw notFound();
      } else if (error.response.statusCode === 400) {
        throw badRequest();
      } else {
        throw error;
      }
    }

  })
}
