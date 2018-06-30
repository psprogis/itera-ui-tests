
class NavigationMenu {
    constructor(rootElement = $('nav.mainNavigation')) {
        this.root = rootElement;
    }

    selectItem({ name }) {
        // this.root.element(by.cssContainingText('a.js-nav-switch', name)).click();
        this.root.$('li.hide-for-medium a[href="#40"]').click();
    }

    selectSubItem({ name }) {
        // this.root.element(by.cssContainingText('a', name)).click();
        this.root.$('div.hide-for-small a[href="/you-at-itera/vacancies/"]').click();
    }
}

module.exports = NavigationMenu;
