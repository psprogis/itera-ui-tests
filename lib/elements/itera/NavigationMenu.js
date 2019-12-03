
class NavigationMenu {
    constructor(rootElement = $('nav.mainNavigation')) {
        this.root = rootElement;
    }

    async open() {
        await $('button.burger').click();
    }

    // TODO: should be fixed and support different options
    async selectItem() {
        // this.root.element(by.cssContainingText('a.js-nav-switch', name)).click();
        await this.root.$('a[href$="you-at-itera/"]').click();
    }

    // TODO: should be fixed and support different options
    // TODO: extract from navigation menu (after latest update this element no longer belongs to menu)
    async selectSubItem() {
        await $('a[href$="vacancies/"]').click();
    }
}

module.exports = NavigationMenu;
