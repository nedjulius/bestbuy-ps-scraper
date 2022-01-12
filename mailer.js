require('dotenv').config()

const {BESTBUY_PS_DIGITAL_URL} = require('./constants')
const nodemailer = require('nodemailer')

class Mailer {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_PASS,
      },
    })
    this.recipient = process.env.EMAIL_TO
    this.senderUser = process.env.EMAIL_NAME
  }

  async send({subject, html}) {
    await this.transporter.sendMail({
      from: this.senderUser,
      to: this.recipient,
      subject,
      html,
    })
  }
}

const mailer = new Mailer()

const sendFoundNotificationMail = () =>
  mailer.send({
    subject: 'Found a PS5!',
    html: `<h2>Immediately go to BestBuy at <a href='${BESTBUY_PS_DIGITAL_URL}'>this link</a></h2>`,
  })

const sendErrorNotificationMail = (error) =>
  mailer.send({
    subject: 'An error occurred in the scraper',
    html: `<h2 style="color:red">An error occurred in the PS5 scraper: ${error}</h2>`,
  })

module.exports = {sendFoundNotificationMail, sendErrorNotificationMail}
