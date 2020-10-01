const moment = require('moment');
const constants = require('./constants');
const attendance = require('../model/attendance');
const resources = require('../model/resource');


/**
 * @description Missing attendance Dates
 * @summary find missing attendance
 * @returns array of dates
 */
const missingDates = async (req, res) => {
    var to_Date = moment(new Date()).format('DD-MMM-YYYY');
    var from_Date = moment(constants.constant_Data.DB_STARTS_DATE).format('DD-MMM-YYYY');
    var dates = [];
    for (var m = moment(from_Date); m.isSameOrBefore(to_Date); m.add(1, 'days')) {
        if (!(m.days() == 6 || m.days() == 0)) {
            dates.push(m.format('DD-MMM-YYYY'));
        }        
    }
    const allUserData = await attendance.distinct('date');
    const missing_Dates = dates.filter((dates) => {
        if(allUserData.includes(dates)){
            return false;
        }else {
            return true;
        }
    });
    res.send(missing_Dates);
}

module.exports = {
    missingDates,
}
