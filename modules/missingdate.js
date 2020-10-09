const moment = require('moment');
const constants = require('./constants');
const attendance = require('../model/attendance');

/**
 * @description Missing attendance Dates
 * @summary find missing attendance
 * @returns array of dates
 */
const missingDates = async (req, res) => {
    const to_Date = moment(new Date()).format(constants.constant_Data.DATE_FORMAT);
    const from_Date = moment(constants.constant_Data.DB_STARTS_DATE).format(constants.constant_Data.DATE_FORMAT);
    const dates = [];
    for (let m = moment(from_Date); m.isSameOrBefore(to_Date); m.add(1, 'days')) {
        if (!(m.days() == 6 || m.days() == 0)) {
            dates.push(m.format(constants.constant_Data.DATE_FORMAT));
        }        
    }
    const allUserData = await attendance.distinct('date');
    const missing_Dates = dates.filter((dates) => !allUserData.includes(dates));
    res.send(missing_Dates);
}

module.exports = {
    missingDates,
}
