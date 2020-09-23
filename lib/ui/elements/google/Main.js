const log = require('log4js').getLogger('g-main-page');
const { waitReady } = require('../../helpers');

class GooglePage {
    constructor() {
        log.info('creating google page');
    }

    static async open() {
        log.info('opening google...');

        const URL = 'https://www.google.com/';

        await browser.get(URL);
    }

    static async search({ term }) {
        log.info(`searching for: ${term}`);

        const searchInput = $('input[name="q"]');

        await searchInput.clear().sendKeys(term);
        await searchInput.sendKeys(protractor.Key.ENTER);

        const resultBlock = $$('.bkWMgd').first();
        await waitReady({ element: resultBlock, timeout: 5000 });
    }
}

module.exports = GooglePage;
