
const NavigationMenu = require('./NavigationMenu');

class Base {

    constructor() {
        this.navigationMenu = new NavigationMenu();
    }

    async open({ url }) {
        await browser.get(url);
    }

    async switchCountry({ country }) {
        const SUPPORTED_COUNTRIES = ['Norway', 'Denmark', 'Ukraine', 'Slovalia', 'Sweden', 'English'];

        if (!SUPPORTED_COUNTRIES.includes(country)) {
            throw new Error(`cannot switch to ${country}`);
        }

        const countriesRoot = $('div.header__countries');

        await countriesRoot.click();
        await countriesRoot.element(by.cssContainingText('a', country)).click();
    }

    async getTitle() {
        return browser.getTitle();
    }

    async navigateToVacancies() {
        await this.navigationMenu.open();
        await this.navigationMenu.selectItem('You at Itera');
        await this.navigationMenu.selectSubItem('Vacancies');
    }
}

module.exports = Base;
