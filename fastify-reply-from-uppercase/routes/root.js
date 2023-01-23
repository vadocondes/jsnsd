'use strict'
 
const { Transform } = require('stream');
const createTransformStream = () => {
  return new Transform({
    transform(chunk, enc, next) {
      const uppercase = chunk.toString().toUpperCase();
      next(null, uppercase);
    }
  })
}
const uppercaseStream = createTransformStream();
 
 
module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const { url } = request.query;
    try {
      new URL(url)
    } catch (error) {
      throw fastify.httpErrors.badRequest() 
    }
    await reply.from(url, {
      onResponse(req, reply, response) {
        reply.send(response.pipe(uppercaseStream));
      }
    });
  })
}