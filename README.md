# BestBuy PlayStation 5 digital scraper

## About
Simple BestBuy scraper that runs on Node with `Puppeteer` and `node-cron`. Program sets up a cron job that runs every 30 mins to check the BestBuy website for PlayStation 5 digital product and notifies me if it's in stock.

## Set up
If you want to set it up for youself, you shall follow the instructions below:

1. Add environment variables:
    - `EMAIL_TO` - notification recipient email
    - `EMAIL_NAME` - notification sender address (must be Gmail account)
    - `EMAIL_PASS` - notification sender password (must be Gmail account)
2. Enable less secure apps access in Gmail [here](https://myaccount.google.com/lesssecureapps)
3. Install dependencies by running `npm install`
4. Start the program with `npm run start`
5. Good luck!
