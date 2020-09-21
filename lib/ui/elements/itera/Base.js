
const NavigationMenu = require('./NavigationMenu');
const helpers = require('../../helpers');

class Base {

    constructor() {
        this.navigationMenu = new NavigationMenu();
    }

    async open({ url }) {
        await browser.get(url);
    }

    async switchCountry({ name }) {
        const SUPPORTED_COUNTRIES = [
            { name: 'Norway', code: 'no' },
            { name: 'Denmark', code: 'dk' },
            { name: 'Ukraine', code: 'ua' },
            { name: 'Slovakia', code: 'sk' },
            { name: 'Sweden', code: 'se' },
            { name: 'English', code: 'en' },
        ];

        const targetCountry = SUPPORTED_COUNTRIES.find(country => country.name === name);

        if (!targetCountry) {
            throw new Error(`cannot switch to ${name}`);
        }

        const countriesRoot = $('div.header__countries');

        await countriesRoot.click();
        await countriesRoot.element(by.cssContainingText('a', targetCountry.name)).click();

        const countryCode = countriesRoot.element(by.cssContainingText('button', `${targetCountry.code}`));
        await helpers.waitReady({ element: countryCode });
    }

    async getTitle() {
        return browser.getTitle();
    }

    async navigateToVacancies() {
        await this.navigationMenu.open();
        await this.navigationMenu.selectItem('Be one of us');
        await this.navigationMenu.selectSubItem('Vacancies');
    }
}

module.exports = Base;
