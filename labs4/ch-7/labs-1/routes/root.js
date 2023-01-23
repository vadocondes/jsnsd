'use strict'
const got = require('got');

const { BOAT_SERVICE_PORT = 8000, BRAND_SERVICE_PORT = 4000} = process.env
const boatService = `http://localhost:${BOAT_SERVICE_PORT}`
const brandService = `http://localhost:${BRAND_SERVICE_PORT}`

module.exports = async function (fastify, opts) {
  fastify.get('/:id', async function (request, reply) {
    const { id } = request.params
    try {
      const boat = await got(`${boatService}/${id}`, {retry: 0, timeout:600}).json()
      const brand = await got(`${brandService}/${boat.brand}`,{retry: 0, timeout:600}).json()

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
      } else if ( error.response.statusCode === 400) {
        throw fastify.httpErrors.badRequest()
      }
    }
  })
}
