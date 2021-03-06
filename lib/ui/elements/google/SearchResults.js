const log = require('log4js').getLogger('g-search-page');
const { waitElementVisible } = require('../../browserHelpers');

class GoogleSearchResults {
    constructor() {
        log.info('creating search results page');
    }

    static async getAllResults() {
        // there are also ads and other types of results
        const regularResults = [];

        const regularResultsBlock = $$('div#center_col div#search .rc');

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
        const featuredWidgetText = $('#kp-wp-tab-overview h2 ~ span');

        await waitElementVisible({ element: featuredWidgetText, timeout: 5000 });

        const widgetText = await featuredWidgetText.getText();

        return { text: widgetText };
    }

    static async waitResultStatsLabelAppears() {
        return waitElementVisible({ element: $('#extabar #result-stats'), timeout: 5000 });
    }
}

module.exports = GoogleSearchResults;
