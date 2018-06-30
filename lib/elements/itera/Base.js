
class Base {

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
        const title = await browser.getTitle();

        return title;
    }

    // async search() {
    //
    // }
}

module.exports = Base;
