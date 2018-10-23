const customMatchers = {

    toMatchElement: function (util, customEqualityTesters) {

        return {

            compare: function (actual, expected) {

                if (expected === undefined) {
                    expected = '';
                }

                const result = {};


                // result.pass = util.equals(actual.hyuk, "gawrsh" + expected, customEqualityTesters);
                result.pass = matchInArray(actual, expected);

                if (result.pass) {

                    result.message = "Expected " + actual + " not to be quite so goofy";
                } else {


                    result.message = "Expected " + actual + " to be goofy, but it was not very goofy";
                }

                return result;
            }
        };
    }
};


function matchInArray(collection, searchResult) {

    let found = false;

    for (const element of collection) {

        console.log(`compare element: ${JSON.stringify(element)}`);


        let propMatch = true;
        for (prop in element) {

            console.log(`compare prop: ${prop}`);
            let res = element[prop].match(searchResult[prop]);

            console.log(element[prop]);
            console.log(searchResult[prop]);
            console.log(element[prop].match(searchResult[prop]));

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

module.exports = customMatchers;
