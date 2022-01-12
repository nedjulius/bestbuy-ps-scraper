const {sendNotificationEmail} = require('./send-notification-email');
const {BESTBUY_PS_DIGITAL_URL} = require('./constants');
const cron = require('node-cron');
const puppeteer = require('puppeteer');

const scrapeForBuyButtonText = async () => {
	const browser = await puppeteer.launch({
		headless: true,
		ignoreHTTPSErrors: true,
    args: [`--window-size=1920,1080`],
		defaultViewport: {
			width: 1920,
			height: 1080,
		},
	});

	const page = await browser.newPage();
	await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
	await page.setCacheEnabled(false);

	await page.goto(BESTBUY_PS_DIGITAL_URL);
	await Promise.all([
		page.waitForNavigation({waitUntil: 'networkidle2'}),
		page.click('.us-link')
	])

	const soldOutBtn = await page.$('.fulfillment-add-to-cart-button');
	const soldOutBtnText = await page.evaluate(el => el.textContent, soldOutBtn);

	await browser.close();

	return soldOutBtnText.trim();
}

const cronJob = cron.schedule('*/30 * * * *', async () => {
	const buyButtonText = await scrapeForBuyButtonText();

	if (buyButtonText !== 'Sold Out') {
		await sendNotificationEmail();
		cronJob.stop();
	} else {
		console.log('Not found... Keep on working!');
	}
});
