const log = require('log4js').getLogger('g-main-page');
const SearchResults = require('./SearchResults');

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

        return SearchResults.waitResultStatsLabelAppears();
    }
}

module.exports = GooglePage;
