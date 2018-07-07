
const log = require('log4js').getLogger('searchResults');

class SearchResults {

    getSearchResults() {
        // easiest way: just return $$('div.sr_item div.address a[href]').getText()
        const results = [];

        // TODO: include also preferred result ?

        return $$('div.sr_item div.address a[href]').getText()
            .then((addresses) => {
                log.debug(addresses);

                addresses.forEach((address) => {
                    const result = {
                        district: '',
                        city: '',
                    };

                    const addresaArray = address.split(',');

                    if (!addresaArray.length) {
                        throw new Error(`Got unexpected address line: ${address}`);
                    }

                    if (addresaArray.length === 2) {
                        result.district = addresaArray[0].trim();
                        result.city = addresaArray[1].trim();
                    } else {
                        result.city = addresaArray[0].trim();
                    }

                    results.push(result);
                });

                return results;
            });
    }
}

module.exports = SearchResults;
