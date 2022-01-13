const {
  sendFoundNotificationMail,
  sendErrorNotificationMail,
} = require('./mailer')
const {BESTBUY_PS_DIGITAL_URL} = require('./constants')
const axios = require('axios')
const cheerio = require('cheerio')

const scrapeForBuyButtonText = async () => {
  const {data} = await axios.get(BESTBUY_PS_DIGITAL_URL)
  const $ = cheerio.load(data)

  return $('.fulfillment-add-to-cart-button').text()
}

const cronJob = cron.schedule('*/30 * * * *', async () => {
  try {
    const buyButtonText = await scrapeForBuyButtonText()

    if (buyButtonText !== 'Sold Out') {
      await sendFoundNotificationMail()
      cronJob.stop()
    } else {
      console.log('Not found... Keep on working!')
    }
  } catch (error) {
    await sendErrorNotificationMail(error)
    cronJob.stop()
  }
})
