const log = require('log4js').getLogger('spec-logger');
const { MainPage: GoogleMainPage, SearchResultsPage } = require('../lib/ui/elements/google');
const customMatchers = require('../lib/customMatchers');

describe('Google search', () => {

    beforeAll(async () => {
        jasmine.addMatchers(customMatchers);

        await browser.waitForAngularEnabled(false);

        await GoogleMainPage.open();
    });

    beforeEach(async () => {
        await GoogleMainPage.search({ term: 'selenium' });
    });

    it('should dispay link to Wikipedia at first position in results', async () => {
        allure.story('some story number');
        allure.feature('google search');

        const { regularResults: results } = await SearchResultsPage.getAllResults();
        const WIKI_URL = 'https://uk.wikipedia.org › wiki › Selenium';

        log.debug('search results: ');
        log.debug(results);

        expect(results.length).toBeGreaterThan(0, 'found 0 results');

        const firstUrl = results[0].url;

        expect(firstUrl).toBe(WIKI_URL, 'got wrong first result');
    });

    it('should contain wikipedia and habr in results', async () => {
        const { regularResults: results } = await SearchResultsPage.getAllResults();

        const wikipediaExpectedResult = {
            text: /Selenium — В.*/,
            url: '',
        };

        const habrExpectedResult = {
            text: /Что такое Selenium\? \/ Хабр/,
            url: '',
        };

        expect(results).toMatchElement(wikipediaExpectedResult, 'no wikipedia in search results');
        expect(results).toMatchElement(habrExpectedResult, 'no habr in search results');
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
