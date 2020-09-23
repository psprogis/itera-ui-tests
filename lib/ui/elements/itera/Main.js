const log = require('log4js').getLogger('itera-main');
const Base = require('./Base');

class MainPage extends Base {

    async open() {
        log.info('opening itera page...');
        const URL = 'https://www.itera.no/';

        await super.open({ url: URL });
    }
}

module.exports = MainPage;
