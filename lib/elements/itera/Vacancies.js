
const log = require('log4js').getLogger('itera-main');
const NavigationMenu = require('./NavigationMenu');
const Base = require('./Base');

class VacanciesPage extends Base {

    constructor() {
        super();
        this.navigationMenu = new NavigationMenu();
    }

    static async open() {
        log.info('opening itera page...');

        const URL = 'https://www.itera.no/';

        await browser.get(URL);
    }

    // TODO: move to base page
    async openMainMenu() {
        await $('button.burger').click();
    }

    navigateToVacancies() {
        this.openMainMenu();
        this.navigationMenu.selectItem('You at Itera');
        this.navigationMenu.selectSubItem('Vacancies');
    }

    async getAllVacancies() {
        const vacanciesRoot = $('section.bg--gray div.container--list');
        const vacancies = [];

        await vacanciesRoot.$$('.block--vacancy').each(async (el) => {
            const title = await el.$('.vacancy__title').getText();

            vacancies.push({title});
        });

        return vacancies;
    }
}

module.exports = VacanciesPage;
