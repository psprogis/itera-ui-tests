
require('./log4js-config').init();

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    ignoreUncaughtExceptions: true,
    specs: [
        'specs/google.search.spec.js',
    ],

    framework: 'jasmine2',
    allScriptsTimeout: 300000,
    getPageTimeout: 120000,

    // useBlockingProxy: true,
    // highlightDelay: 3000,
    // webDriverLogDir: 'logs',
    // seleniumSessionId: 'b5aa12a870c5eb552728c242e676758c  ',

    onPrepare() {
        const width = 1600;
        const height = 900;
        browser.driver.manage().window().setSize(width, height);

        global.EC = protractor.ExpectedConditions;

        jasmine.getEnv().addReporter(
            new SpecReporter({
                suite: {
                    displayNumber: true,
                },
                spec: {
                    displayStackTrace: true,
                    displayDuration: true,
                },
                summary: {
                    displayDuration: true,
                },

            }),
        );
    },

    jasmineNodeOpts: {
        isVerbose: true,
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 180000,
    },
};
