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

let sendMail = function(message,callback) {
  transporter.sendMail(message, (err,info) => {
    callback(err)
  })
}


module.exports={sendMail}
