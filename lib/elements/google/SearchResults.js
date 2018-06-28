
const log = require('log4js').getLogger('g-search-page');

class GoogleSearchResults {
    constructor() {
        log.info('creating search results page');
    }

    static async getAllResults() {
        // there are also ads and other types of results
        const regularResults = [];

        const regularResultsBlock = $$('div.srg div.rc');

        // add lib method, e.g. waitReady
        await browser.wait(EC.visibilityOf(regularResultsBlock.first()), 5000);

        await regularResultsBlock.each(async (el) => {
            const text = await el.$('.r a').getText();
            const url = await el.$('.s cite').getText();

            regularResults.push({
                text,
                url,
            });
        });

        return { regularResults };
    }

    static async getFeaturedWidgetContent() {
        const featuredWidgetText = $('.kp-blk .LGOjhe');

        await browser.wait(EC.visibilityOf(featuredWidgetText), 5000);

        const widgetText = await featuredWidgetText.getText();

        return { text: widgetText };
    }
}

module.exports = GoogleSearchResults;
