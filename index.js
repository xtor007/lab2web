const fastify = require('fastify')({ logger: true })
const fastifyStatic = require('fastify-static')
const path = require('path')

fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public')
})

// Declare a route
fastify.get('/', async (request, reply) => {
  return reply.sendFile('index.html')
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
