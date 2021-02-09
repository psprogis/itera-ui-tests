require('./log4js-config').init();
const log = require('log4js').getLogger('conf-logger');
const fs = require('fs');
const path = require('path');

const { SpecReporter } = require('jasmine-spec-reporter');
const AllureReporter = require('jasmine-allure-reporter');

function setupCapabilities(config) {
    let capabilityName = process.env.CAPABILITY_NAME;
    // let { capabilityName } = browser.params; // --params can be used also
    const supportedCapabilities = ['chrome', 'firefox', 'multiple', 'headless-chrome'];

    log.debug(`capability name in setup: <${capabilityName}>`);

    if (capabilityName === undefined || capabilityName === '') {
        log.warn('using default chrome setup');
        capabilityName = 'chrome';
    }

    if (!supportedCapabilities.includes(capabilityName)) {
        throw new Error(`unknown capability, should be one of: ${supportedCapabilities}`);
    }

    log.info(`prepare capabilities for: ${capabilityName}`);

    // https://www.protractortest.org/#/browser-setup
    // https://sites.google.com/a/chromium.org/chromedriver/capabilities
    const capabilitiesMap = {
        chrome: {
            browserName: 'chrome',
            enableVNC: true,
            version: '',
            platform: 'ANY',
            chromeOptions: {
                args: ['--lang=en'],
            },
        },

        // https://developer.mozilla.org/en-US/docs/Web/WebDriver/Capabilities/firefoxOptions#Prefs
        firefox: {
            browserName: 'firefox',
            enableVNC: true,
            'moz:firefoxOptions': {
                prefs: {
                    'geo.enabled': false,
                },
            },
        },
        multiple: [
            {
                browserName: 'chrome',
            },
            {
                browserName: 'firefox',
            },
        ],
        'headless-chrome': {
            browserName: 'chrome',
            chromeOptions: {
                args: ['--headless', '--disable-gpu', '--window-size=1600,1200'],
            },
        },
    };

    /* eslint-disable no-param-reassign */
    if (capabilityName === 'multiple') {
        config.multiCapabilities = capabilitiesMap[capabilityName];
    } else {
        config.capabilities = capabilitiesMap[capabilityName];
    }
    /* eslint-enable no-param-reassign */
}

const config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    ignoreUncaughtExceptions: true,
    specs: [
        'specs/takeaway.orders.spec.js',
        'specs/booking.search.spec.js',
        'specs/google.search.spec.js',
        'specs/itera.vacancies.spec.js',
    ],

    SELENIUM_PROMISE_MANAGER: false,
    framework: 'jasmine2',
    allScriptsTimeout: 300000,
    getPageTimeout: 120000,

    // uncomment for debug
    // useBlockingProxy: true,
    // highlightDelay: 3000,
    // webDriverLogDir: 'logs',
    // seleniumSessionId: '091cda6b89457082ee779ccc358f473c',

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

        // temporary solution for unhandled rejections
        process.on('unhandledRejection', (error) => {
            log.warn('unhandledRejection');
            log.warn(error);
        });
    },

    onComplete() {
        const browserLogsFilePath = path.join(__dirname, 'browser.log');

        browser.manage().logs().get('browser')
            .then(browserLogs => {
                browserLogs.forEach(logMsg => {
                    const timestamp = new Date(0);
                    timestamp.setUTCSeconds(logMsg.timestamp);
                    fs.appendFileSync(browserLogsFilePath, `[${timestamp}] ${logMsg.message} \n`);
                });
            });
    },

    jasmineNodeOpts: {
        isVerbose: true,
        showColors: true,
        includeStackTrace: true,
        print() {}, // turn off dots
    },
};

setupCapabilities(config);

log.info(config);

exports.config = config;
