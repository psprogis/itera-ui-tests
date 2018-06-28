
const log = require('log4js').getLogger('g-search-page');

class GoogleSearchResults {
    constructor() {
        log.info('creating search results page');
    }

    static async getAllResults() {
        // there are also ads and other types of results
        const ordinaryResults = [];

        const ordinaryResultsBlock = $$('div.srg div.rc');

        browser.wait(EC.visibilityOf(ordinaryResultsBlock.first()), 5000);

        await ordinaryResultsBlock.each(async (el) => {
            const text = await el.$('.r a').getText();
            const url = await el.$('.s cite').getText();

            ordinaryResults.push({
                text,
                url,
            });
        });

        return ordinaryResults;
    }

    static async getFeaturedWidgetResults() {
        const featuredWidgetText = $('.kp-blk .LGOjhe');

        browser.wait(EC.visibilityOf(featuredWidgetText), 5000);

        const widgetText = await featuredWidgetText.getText();

        return { content: widgetText };
    }
}

module.exports = GoogleSearchResults;
