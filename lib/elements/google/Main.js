
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
        const searchInput = $('input#lst-ib');

        await searchInput.clear().sendKeys(term);
        await searchInput.sendKeys(protractor.Key.ENTER);
    }
}

module.exports = GooglePage;
