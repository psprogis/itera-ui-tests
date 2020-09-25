const log = require('log4js').getLogger('g-search-page');
const { waitElementVisible } = require('../../browserHelpers');

class GoogleSearchResults {
    constructor() {
        log.info('creating search results page');
    }

    static async getAllResults() {
        // there are also ads and other types of results
        const regularResults = [];

        const regularResultsBlock = $$('div.srg div.rc');

        await waitElementVisible({ element: regularResultsBlock.first(), timeout: 5000 });

        await regularResultsBlock.each(async (el) => {
            const text = await el.$('.r h3').getText();
            const url = await el.$('cite').getText();

            regularResults.push({
                text,
                url,
            });
        });

        return { regularResults };
    }

    static async getFeaturedWidgetContent() {
        const featuredWidgetText = $('.knowledge-panel [data-attrid="description"]');

        await waitElementVisible({ element: featuredWidgetText, timeout: 5000 });

        const widgetText = await featuredWidgetText.getText();

        return { text: widgetText };
    }
}

module.exports = GoogleSearchResults;
