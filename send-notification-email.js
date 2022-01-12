require('dotenv').config();

const {BESTBUY_PS_DIGITAL_URL} = require('./constants');
const nodemailer = require('nodemailer');

const sendNotificationEmail = async () => {
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL_NAME,
			pass: process.env.EMAIL_PASS,
		},
	});

	try {
		await transporter.sendMail({
			from: process.env.EMAIL_NAME,
			to: process.env.EMAIL_TO,
			subject: 'Found an PS5...',
			html:
        `<h2>Immediately go to BestBuy at <a href='${BESTBUY_PS_DIGITAL_URL}'>this link</a></h2>`,
		});

		console.log('Email sent!');
	} catch (e) {
		console.error(e);
	}
}

module.exports = {sendNotificationEmail};
