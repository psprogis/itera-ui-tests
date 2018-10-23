
function matchInArray(collection, searchResult) {

    let found = false;

    for (const element of collection) {

        let propMatch = true;
        for (const prop in element) {

            const res = element[prop].match(searchResult[prop]);

            if (!res) {
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

const customMatchers = {

    toMatchElement(util, customEqualityTesters) {

        return {

            compare(actual, expected = '') {

                const result = {};


                // result.pass = util.equals(actual.hyuk, "gawrsh" + expected, customEqualityTesters);
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
