// TODO: update matcher according to the best practices from the following sources:
// 1. https://jasmine.github.io/2.5/custom_matcher.html
// 2. https://github.com/wix/protractor-helpers/blob/master/src/matchers.js
// 3. https://github.com/Xotabu4/jasmine-protractor-matchers/blob/master/built/index.js
// 4. https://content.pivotal.io/blog/writing-beautiful-specs-with-jasmine-custom-matchers

/* eslint-disable no-restricted-syntax */
// TODO: add js doc
function matchInArray(collection, searchResult) {

    let found = false;

    for (const element of collection) {

        let propMatch = true;
        for (const prop in element) {

            if (!Object.prototype.hasOwnProperty.call(element, prop)) {
                continue;
            }

            if (!element[prop].match(searchResult[prop])) {
                propMatch = false;
                break;
            }
        }

        if (propMatch) {
            found = true;
            break;
        }
    }

    return found;
}
/* eslint-enable no-restricted-syntax */

const customMatchers = {

    toMatchElement() {

        return {

            compare(actual, expected = '') {

                const result = {};

                result.pass = matchInArray(actual, expected);

                if (result.pass) {
                    result.message = `Expected ${actual} not to be quite so goofy`;
                } else {
                    result.message = `Expected ${actual} to be goofy, but it was not very goofy`;
                }

                return result;
            },
        };
    },
};

module.exports = customMatchers;
