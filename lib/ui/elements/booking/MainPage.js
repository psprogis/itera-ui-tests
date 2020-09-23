const log = require('log4js').getLogger('mainPage');
const DateWidget = require('./DateWidget');

class MainPage {
    constructor() {
        this.baseUrl = 'https://www.booking.com';

        this.searchInput = $('input#ss');

        this.checkInDateWidget = new DateWidget('Check-in');
        this.checkOutDateWidget = new DateWidget('Check-out');

        this.submitButton = $('div.sb-searchbox-submit-col button');
    }

    async open() {

        // TODO: add expected condition
        return browser.get(this.baseUrl);
    }

    async search({ searchStr, checkinDate, checkoutDate }) {
        log.info(`searching: <${searchStr}>, checking date: <${checkinDate}>, checkout date <${checkoutDate}>`);

        await this.searchInput.clear().sendKeys(searchStr);

        // TODO: press <ESC> button instead ?
        // workaround: hide autocompletion dropdown
        await browser.actions()
            .mouseMove($('.sb-searchbox__title-text'))
            .click()
            .perform();

        await this.checkInDateWidget.selectDate(checkinDate);
        await this.checkOutDateWidget.selectDate(checkoutDate);

        return this.submitButton.click();

        // TODO: add expected condition to make sure search results are displayed
    }
}

module.exports = MainPage;
