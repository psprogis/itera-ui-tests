
const log = require('log4js').getLogger('spec-logger');
const { MainPage: GoogleMainPage, SearchResultsPage } = require('../lib/elements/google');

describe('Google search', () => {

    beforeAll(async () => {
        browser.ignoreSynchronization = true;

        await GoogleMainPage.open();
    });

    beforeEach(async () => {
        GoogleMainPage.search({ term: 'selenium' });
    });

    it('should dispay link to seleniumhq at first position in results', async () => {
        const results = await SearchResultsPage.getAllResults();
        const firstUrl = results[0].url;

        expect(firstUrl).toBe('https://www.seleniumhq.org/', 'got wrong first result');

        log.debug('search results: ');
        log.debug(results);
    });

    it('should contain wikipedia and habr in results', async () => {
        const results = await SearchResultsPage.getAllResults();
        const wikipediaExpectedResult = {
            text: 'Selenium — Википедия',
            url: 'https://ru.wikipedia.org/wiki/Selenium',
        };

        const habrExpectedResult = {
            text: 'Что такое Selenium? / Хабр',
            url: 'https://habr.com/post/152653/',
        };

        expect(results).toContain(wikipediaExpectedResult);
        expect(results).toContain(habrExpectedResult);
    });

    it('should display featured widget', async () => {
        const widgetText = await SearchResultsPage.getFeaturedWidgetResults();
        const MINIMUM_LENGTH = 10;

        log.info(`widget text: ${widgetText}`);

        expect(widgetText.content.length).toBeGreaterThan(MINIMUM_LENGTH,
            `widget text should have at least ${MINIMUM_LENGTH} characters`);
    });

    afterAll(async () => {
        // add cleanup if needed
    });
});
