
const log = require('log4js').getLogger('g-main-page');

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

        const searchInput = $('input#lst-ib');

        await searchInput.clear().sendKeys(term);
        await searchInput.sendKeys(protractor.Key.ENTER);

        const firstBlock = $('.bkWMgd');
        await browser.wait(EC.elementToBeClickable(firstBlock), 5000);
    }
}

module.exports = GooglePage;
