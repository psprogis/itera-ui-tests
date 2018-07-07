
const log = require('log4js').getLogger('date-widget');
const timeUtils = require('../../timeUtils'); // add NODE_PATH ?

class DateWidget {
    constructor(tag) {
        this.picker = $(`[data-calendar2-title="${tag}"]`);

        const supportedTags = ['Check-in', 'Check-out'];
        if (!supportedTags.includes(tag)) {
            throw new Error(`[date widget] tag: ${tag} is not supported`);
        }

        const calendarTag = tag === 'Check-in' ? 'checkin' : 'checkout';

        this.calendarBody = $(`.c2-wrapper-s-${calendarTag} .c2-calendar-body`);
    }

    selectToday() {
        // FIXME
        // return this.root.$('td.c2-day-s-today').click();
    }

    async selectDate(date) {

        // TODO: use Tab to navigate and just enter date ?
        // open calendar
        await this.picker.click();

        // select date (each date in calendar has id - epochtime of its date
        // as of 0 hours 0 minutes, 0 seconds )
        const dateId = timeUtils.getEpochTime(date);
        log.debug(`selectDate, epoch time: <${dateId}>`);

        return this.calendarBody.$(`td[data-id="${dateId}"]`).click();
    }
}

module.exports = DateWidget;
