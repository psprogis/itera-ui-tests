const log = require('log4js').getLogger('restaurant-page');

const OrderDetailsPage = require('./OrderDetailsPage');

class RestaurantPage {

    constructor({ name }) {
        log.info(`creating page for the restaurant: ${name}`);
        this.name = name;

        // TODO: create Basket class (editItem, addItem, etc.)
        // this.basket = new Basket();
    }

    async placeOrder() {
        await $('.basket-container button.basket__order-button').click();

        return new OrderDetailsPage();
    }

    // TODO: add category
    async addItem({ name }) {
        // save mapping item name -> id, e.g. "Salami": "QON30PNRN" ?
        // it will work only for permanent ids
        // as of now click first found item
        await $$(`[data-product-name=${name}]`).get(0).click();
        return this;
    }

    /* eslint-disable-next-line no-unused-vars */
    async addItems({ items }) {
        throw new Error('not implemented');
    }
}

module.exports = RestaurantPage;
