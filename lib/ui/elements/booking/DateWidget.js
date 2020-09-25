const log = require('log4js').getLogger('date-widget');
const timeUtils = require('../../../timeUtils'); // add NODE_PATH ?

class DateWidget {
    constructor(tag) {
        this.picker = $(`[data-calendar2-title="${tag}"]`);

        const supportedTags = ['Check-in', 'Check-out'];
        if (!supportedTags.includes(tag)) {
            throw new Error(`[date widget] tag: ${tag} is not supported`);
        }

        // old booking version
        // const calendarTag = tag === 'Check-in' ? 'checkin' : 'checkout';
        // this.calendarBody = $(`.c2-wrapper-s-${calendarTag} .c2-calendar-body`);

        // mockup for new booking markdown
        // const calendarIdx = supportedTags.indexOf(tag);

        // old booking version
        // this.calendarBody = $$('.bui-calendar__wrapper').get(calendarIdx);
    }

    async selectDate(date) {

        // TODO: use Tab to navigate and just enter date ?
        // open calendar
        await this.picker.click();

        // old booking version
        // // select date (each date in calendar has id - epochtime of its date
        // // as of 0 hours 0 minutes, 0 seconds )
        // const dateId = timeUtils.getEpochTime(date);
        // log.debug(`selectDate, epoch time: <${dateId}>`);
        //
        // await this.calendarBody.$(`td[data-id="${dateId}"]`).click();

        // mockup for new booking markdown
        const dateId = timeUtils.getYearMonthDay(date);
        log.debug(`select date: ${date}`);
        const dateCell = $(`td[data-date="${dateId}"]`);

        // await waitReady({ element: dateCell });
        await dateCell.click();

        // hide calendar
        return this.picker.click();
    }
}

module.exports = DateWidget;
