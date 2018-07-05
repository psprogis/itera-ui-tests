
const log = require('log4js').getLogger('spec-logger');
const { MainPage: IteraMainPage, VacanciesPage } = require('../lib/elements/itera');

const mainPage = new IteraMainPage();
const vacanciesPage = new VacanciesPage();

describe('Vacancies list', () => {

    beforeAll(async () => {
        browser.ignoreSynchronization = true;

        await mainPage.open();
        await mainPage.navigateToVacancies();
    });

    it('should be accessible from main page', async () => {
        const title = await mainPage.getTitle();
        expect(title).toBe('Work at Itera - Itera', 'got wrong title for Vacancies page');
    });

    describe('for Ukraine', () => {
        beforeAll(async () => {
            await vacanciesPage.switchCountry({ country: 'Ukraine' });
        });

        it('should contain at least one vacancy', async () => {
            const vacancies = await vacanciesPage.getAllVacancies();

            log.info(`total number of vacancies: ${vacancies.length}`);

            expect(vacancies.length).toBeGreaterThanOrEqual(1, 'found less than 1 vacancy in Ukraine');

            const vacanciesStr = vacancies
                .map(vacancy => vacancy.title)
                .join('\n');

            log.info(`vacancies titles:\n${vacanciesStr}`);
        });

        it('should contain at least one .NET vacancy', async () => {
            const vacancies = await vacanciesPage.getAllVacancies();
            const dotNetRegexp = /\.net/i;
            const dotNetVacancies = vacancies
                .filter(vacancy => dotNetRegexp.test(vacancy.title));

            expect(dotNetVacancies.length).toBeGreaterThanOrEqual(1, 'found less than 1 .NET vacany');
        });
    });
});
