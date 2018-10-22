
// TODO: replace this *hit with moment.js
// TODO: add comments to js docs

/**
 * [getTodayDate description]
 * @return {[type]} [description]
 */
function getTodayDate() {
    return new Date();
}

/**
 * [getNDaysDateFromToday description]
 * @param  {[type]} days [description]
 * @return {[type]}      [description]
 */
function getNDaysDateFromToday(days) {
    const today = new Date();

    return new Date(today.setUTCHours(24 * days, 0, 0, 0));
}

/**
 *
 * @param date
 * @returns {number}
 */
function getEpochTime(date) {
    const d = date;

    d.setUTCHours(0, 0, 0, 0);

    return d.getTime();
}

/**
 *
 * @param date
 * @returns {string}
 */
function getYearMonthDay(date) {
    return date.toISOString().split('T')[0];
}

module.exports = {
    getTodayDate,
    getNDaysDateFromToday,
    getEpochTime,
    getYearMonthDay,
};
