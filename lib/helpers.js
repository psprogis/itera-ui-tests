
const EC = protractor.ExpectedConditions;

async function waitReady({ element, timeout }) {
    await browser.wait(EC.visibilityOf(element), timeout);
}

async function waitToDisappear({ element, timeout }) {
    await browser.wait(EC.not(EC.visibilityOf(element)), timeout);
}

module.exports = {
    waitReady,
    waitToDisappear,
};