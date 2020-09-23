const log = require('log4js').getLogger('spec-logger');
const timeUtils = require('../lib/timeUtils');
const { setNonAngularSite } = require('../lib/ui/browserHelpers');
const { MainPage, SearchResultsPage } = require('../lib/ui/elements/booking');

describe('search feature', () => {

    beforeAll(async () => {
        await setNonAngularSite();

        this.searchResults = new SearchResultsPage();
        this.mainPage = new MainPage();
    });

    beforeEach(async () => {
        await this.mainPage.open();
    });

    it('new should find result for New York city', async () => {
        const CITY = 'New York';

        await this.mainPage.search({
            searchStr: CITY,
            checkinDate: timeUtils.getTodayDate(),
            checkoutDate: timeUtils.getNDaysDateFromToday(7),
        });

        const results = await this.searchResults.getSearchResults();

        log.info('Got the following search results: ');
        log.info(results);

        expect(results.length).toBeGreaterThan(1, 'Expect at least 1 found result (deal)');

        expect(results.map((result) => result.city).every((city) => city.includes(CITY)))
            .toEqual(true, 'Got wrong city names in results');
    });
});
