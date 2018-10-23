module.exports = {
    "extends": "airbnb-base",

    globals: {
        EC: true,
        allure: true,
    },

    env: {
        jasmine: true,
        protractor: true,
        es6: true,
        node: true
    },

    rules: {
        indent: ['error', 4],
        'max-len': ['error', { 'code': 120 }],
        'padded-blocks': 'off',
        'class-methods-use-this': 'off',
        'no-continue': 'off',
    }
};
