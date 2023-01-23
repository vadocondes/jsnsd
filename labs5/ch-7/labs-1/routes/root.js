'use strict'

const got = require('got');
const { BOAT_SERVICE_PORT, BRAND_SERVICE_PORT } = process.env;

module.exports = async function (fastify, opts) {
  fastify.get('/:id', async function (request, reply) {

    const { id } = request.params

    // if (isNaN(Number(id))) {
    //   throw fastify.httpErrors.badRequest()
    // }

    const boatService = `http://localhost:${BOAT_SERVICE_PORT}`
    const brandService = `http://localhost:${BRAND_SERVICE_PORT}`

    try {
      const boat = await got(`${boatService}/${Number(id)}`, {retry: 0, timeout:600}).json()
      const brand = await got(`${brandService}/${Number(boat.brand)}`, {retry: 0, timeout:600}).json()

      return {
        id: boat.id,
        color: boat.color,
        brand: brand.name
      }
    } catch (error) {
      if (!error.response) {
        throw error
      } else if (error.response.statusCode === 404) {
        throw fastify.httpErrors.notFound()
      } else if (error.response.statusCode === 400) {
        throw fastify.httpErrors.badRequest()
      } else {
        throw error
      }
    }
  })
}
