'use strict'

const got = require('got');

module.exports = async function (fastify, opts) {
  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params;
    const { BRAND_SERVICE_PORT = 3001 , BOAT_SERVICE_PORT = 4000 } = process.env ;

    const boatService = `http:localhost:${BOAT_SERVICE_PORT}`;
    const brandService = `http:localhost:${BRAND_SERVICE_PORT}`;

    try {
      const boat = await got(`${boatService}/${id}`, {timeout: 600, retry:0}).json();
      const brand = await got(`${brandService}/${boat.brand}`, {timeout: 600, retry:0}).json();
      return {
        id : boat.id,
        color: boat.color,
        brand: brand.name         
      }
    } catch (error) {
       if (error.response.statusCode === 400) {
        throw fastify.httpErrors.badRequest();
      } else if (error.response.statusCode === 404) {
        throw fastify.httpErrors.notFound();
      } else {
        throw error
      }

    }



  })
}
