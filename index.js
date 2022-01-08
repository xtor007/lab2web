const fastify = require('fastify')({ logger: true })
const fastifyStatic = require('fastify-static')
const path = require('path')
const mailer = require('./mail')
require('dotenv').config()

fastify.register(require('fastify-formbody'))

fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public')
})

// Declare a route
// fastify.get('/', async (request, reply) => {
//   return reply.sendFile('index.html')
// })

fastify.post('/form', async (request, reply) => {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(request.body.email)) {
    return reply.send('error email')
  }
  if (!request.body.name || request.body.name === '') {
    console.log("not work")
    return reply.send('error name')
  }
  const message = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: process.env.SUBJECT,
    text: `name: ${request.body.name}\nemail: ${request.body.email}`
  }
  mailer(message)
  console.log("work")
  reply.redirect('/')
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
