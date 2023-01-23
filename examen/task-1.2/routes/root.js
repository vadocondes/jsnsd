'use strict'

const { promisify } = require('util')

const timeOut = promisify(setTimeout);

module.exports = async function (fastify, opts) {

  const paramsSchema = {
    id: {
      type: 'integer'
    }
  }

  const queryArraySchema = {
    input: {
      type: 'array'
    }
  }


  const queryStringSchema = {
    input: {
      type: 'array'
    }
  }

    
  fastify.get('/:id', {schema: { params: paramsSchema, query: queryArraySchema }}, async function (request, reply) {
    const { id } = request.params
    const { input } = request.query;
    if (!id || !input) {
      throw fastify.httpErrors.badRequest()
    } else if (Array.isArray(input)) {
      return input.join(',')
    } else {
      return id + 5 + input
    }
  })

    fastify.get('/', {schema: { query: queryStringSchema }}, async function (request, reply) {
    const { src } = request.query
    if (!src ) {
      throw fastify.httpErrors.badRequest()
    } else if (Array.isArray(src)) {
      return src.join(',')
    } else {
      await timeOut(4000)
      return  src.toUpperCase()
    }
  })

  
  // fastify.get('/', {schema: { queryString: queryStringSchema}}, async function (request, reply) {
  //   const { input } = request.query
  //   if (!input) {
  //     throw fastify.httpErrors.badRequest()
  //   } else if (Array.isArray(input)) {
  //     return input.join(',')
  //   } else {
  //     return input.toUpperCase()
  //   }
  // })
}
