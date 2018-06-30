
const log = require('log4js').getLogger('itera-main');
const Base = require('./Base');
const NavigationMenu = require('./NavigationMenu');

class MainPage extends Base {

    constructor() {
        super();
        this.navigationMenu = new NavigationMenu();
    }

    static async open() {
        log.info('opening itera page...');

        const URL = 'https://www.itera.no/';

        await browser.get(URL);
    }

    async openMainMenu() {
        await $('button.burger').click();
    }

    navigateToVacancies() {
        this.openMainMenu();
        this.navigationMenu.selectItem('You at Itera');
        this.navigationMenu.selectSubItem('Vacancies');
    }
}

module.exports = MainPage;
