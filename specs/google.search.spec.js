
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
        const { regularResults: results } = await SearchResultsPage.getAllResults();
        const SELENIUM_URL = 'https://www.seleniumhq.org/';

        log.debug('search results: ');
        log.debug(results);

        expect(results.length).toBeGreaterThan(0, 'found 0 results');

        const firstUrl = results[0].url;

        expect(firstUrl).toBe(SELENIUM_URL, 'got wrong first result');
    });

    it('should contain wikipedia and habr in results', async () => {
        const { regularResults: results } = await SearchResultsPage.getAllResults();

        const wikipediaExpectedResult = {
            text: 'Selenium — Википедия',
            url: 'https://ru.wikipedia.org/wiki/Selenium',
        };

        const habrExpectedResult = {
            text: 'Что такое Selenium? / Хабр',
            url: 'https://habr.com/post/152653/',
        };

        expect(results).toContain(wikipediaExpectedResult, 'no wikipedia in search results');
        expect(results).toContain(habrExpectedResult, 'no habr in search results');
    });

    it('should display featured widget', async () => {
        const { text: widgetText } = await SearchResultsPage.getFeaturedWidgetContent();
        const MINIMUM_LENGTH = 10;

        log.info(`widget text: ${widgetText}`);

        expect(widgetText.length).toBeGreaterThan(MINIMUM_LENGTH,
            `widget text should have at least ${MINIMUM_LENGTH} characters`);
    });

    afterAll(async () => {
        // add cleanup if needed
    });
});
