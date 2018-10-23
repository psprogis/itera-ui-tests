
require('./log4js-config').init();

const { SpecReporter } = require('jasmine-spec-reporter');
const AllureReporter = require('jasmine-allure-reporter');
const consoleReporter = require('jasmine-custom-reporters/spec-console-reporter');

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    ignoreUncaughtExceptions: true,
    specs: [
        'specs/booking.search.spec.js',
        'specs/google.search.spec.js',
        'specs/itera.vacancies.spec.js',
    ],

    framework: 'jasmine2',
    allScriptsTimeout: 300000,
    getPageTimeout: 120000,

    // uncomment for debug
    // useBlockingProxy: true,
    // highlightDelay: 3000,
    // webDriverLogDir: 'logs',
    // seleniumSessionId: '091cda6b89457082ee779ccc358f473c',

    capabilities: {
        browserName: 'chrome',
        version: '',
        platform: 'ANY',
    },

    // capabilities: {
    //     browserName: 'firefox',
    // },

    // multiCapabilities: [
    //     {
    //         browserName: 'chrome',
    //     },
    //     {
    //         browserName: 'firefox',
    //     },
    // ],

    onPrepare() {
        const width = 1600;
        const height = 900;
        browser.driver.manage().window().setSize(width, height);

        // reporters
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

        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir: 'allure-results',
        }));

        jasmine.getEnv().afterEach(async () => {
            const png = await browser.takeScreenshot();
            const pngBuffer = Buffer.from(png, 'base64');

            allure.createAttachment('Screenshot', pngBuffer, 'image/png');
        });

        jasmine.getEnv().addReporter(consoleReporter);
    },

    jasmineNodeOpts: {
        isVerbose: true,
        showColors: true,
        includeStackTrace: true,
        print() {}, // turn off dots
    },
};
