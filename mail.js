const nodeMailer = require('nodemailer')
require('dotenv').config()

const transporter = nodeMailer.createTransport({
  host: process.env.TRANSPORTER_HOST,
  port: process.env.TRANSFORMER_PORT,
  secure: false,
  auth: {
      user: process.env.LOGIN,
      pass: process.env.PASSWORD
  }
})

const mailer = message => {
  transporter.sendMail(message, (err,info) => {
    if (err) return console.log(err)
    //console.log(info)
  })
}

module.exports = mailer
