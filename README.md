# Examples of using protractor for different non-angular sites

## Preconditions/Environment
* Test should work on any linux/unix (CentOS, RedHat, Fedora, etc.), on Windows start tests from Git Bash (`rm command` should be in path)
* node.js version v10.5.0 (but it should work with 8.x also)
```bash
node -v
v10.5.0
```
* npm version 5.10. (package lock will be ignored with npm v less than 5)
```bash
npm -v
5.10.0
```
* webdriver-manager (installed with protractor), run `webdriver-manager update` to get latest versions of drivers
```bash
npm ls -g webdriver-manager
/usr/local/lib
└─┬ protractor@5.3.1
  └── webdriver-manager@12.0.6

# status after update
webdriver-manager status
I/status - selenium standalone versions available: 3.11.0, 3.12.0, 3.13.0 [last]
I/status - chromedriver versions available: 2.38, 2.40 [last]
I/status - geckodriver versions available: v0.20.1, v0.21.0 [last]
I/status - IEDriverServer is not present
I/status - android-sdk is not present
I/status - appium is not present
```
* Start selenium server
```bash
webdriver-manager start
```

## How to run
* Clone repo
* Install dependencies (`npm i`)
* Run test (`npm t`)
* Open html report (```npm run report```)
```bash
git clone https://github.com/psprogis/itera-ui-tests.git
# ...
cd itera-ui-tests/
npm i
# ...
npm t
# ...
npm run report
# ...
Report successfully generated to allure-report
Starting web server...
# ...
```

## Posible issues
* Selenium standalone is not running - run `webdriver-manager start`
* Russian locale, charset, may affect booking search tests

## TODO
* refactor and cleanup navigation menu class
* merge another ui/rest test examples into this repo
* rename repo

## Links
* [node.js](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/)
* [protractor](protractortest.org)
* [webdriver-manager npm](https://www.npmjs.com/package/webdriver-manager)
* [allure](http://allure.qatools.ru/)
