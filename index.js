const fastify = require('fastify')({ logger: true })
const fastifyStatic = require('fastify-static')
const path = require('path')
const mailer = require('./mail')
require('dotenv').config()

var server_port = process.env.PORT || 8000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';

fastify.register(require('fastify-formbody'))

fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public')
})

// Declare a route
// fastify.get('/', async (request, reply) => {
//   return reply.sendFile('index.html')
// })

fastify.post('/form', async (request, reply) => {
  if (!request.body.name || request.body.name === '') {
    return reply.redirect('/?message=Invalid%20name')
  }
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(request.body.email)) {
    return reply.redirect('/?message=Invalid%20email')
  }
  const message = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: process.env.SUBJECT,
    text: `name: ${sanitizeString(request.body.name)}\nemail: ${request.body.email}`
  }
  mailer.sendMail(message,(err) => {
    if (err){
      return reply.redirect(`/?message=${encodeURI(err)}`)
    }   else {
      return reply.redirect('/?message=Email%20was%20sent')
    }
  })

})

function sanitizeString(str){
  str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
  return str.trim();
}

// Run the server!
const start = async () => {
  try {
    await fastify.listen(server_port,server_host)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
