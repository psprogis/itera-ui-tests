const log = require('log4js').getLogger('spec-logger');
const { MainPage: IteraMainPage, VacanciesPage } = require('../lib/ui/elements/itera');
const { setNonAngularSite } = require('../lib/ui/browserHelpers');

const mainPage = new IteraMainPage();
const vacanciesPage = new VacanciesPage();

describe('Itera vacancies list', () => {

    beforeAll(async () => {
        await setNonAngularSite();

        await mainPage.open();
        await mainPage.switchCountry({ name: 'Ukraine' });
        await mainPage.navigateToVacancies();
    });

    it('should be accessible from main page', async () => {
        const title = await mainPage.getTitle();

        expect(title).toBe('Vacancies - Itera', 'got wrong title for Vacancies page');
    });

    describe('for Ukraine', () => {
        beforeAll(async () => {
            await vacanciesPage.switchCountry({ name: 'Ukraine' });
        });

        it('should contain at least one vacancy', async () => {
            const vacancies = await vacanciesPage.getAllVacancies();

            log.info(`total number of vacancies: ${vacancies.length}`);

            expect(vacancies.length).toBeGreaterThanOrEqual(1, 'found less than 1 vacancy in Ukraine');

            const vacanciesStr = vacancies
                .map((vacancy) => vacancy.title)
                .join('\n');

            log.info(`vacancies titles:\n${vacanciesStr}`);
        });

        it('should contain at least one .NET vacancy', async () => {
            const vacancies = await vacanciesPage.getAllVacancies();
            const dotNetVacancies = filterDotNetVacancies(vacancies);

            expect(dotNetVacancies.length).toBeGreaterThanOrEqual(1, 'found less than 1 .NET vacany');
        });
    });
});

function filterDotNetVacancies(allVacancies) {
    const dotNetRegexp = /\.net/i;
    return allVacancies
        .filter((vacancy) => dotNetRegexp.test(vacancy.title));
}
