
class NavigationMenu {
    constructor(rootElement = $('nav.mainNavigation')) {
        this.root = rootElement;
    }

    async open() {
        await $('button.burger').click();
    }

    async selectItem() {
        // this.root.element(by.cssContainingText('a.js-nav-switch', name)).click();
        await this.root.$('li.hide-for-medium a[href="#40"]').click();
    }

    async selectSubItem() {
        // this.root.element(by.cssContainingText('a', name)).click();
        await this.root.$('div.hide-for-small a[href*="/you-at-itera/vacancies/"]').click();
    }
}

module.exports = NavigationMenu;
