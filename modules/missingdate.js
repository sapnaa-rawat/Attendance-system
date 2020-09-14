const moment = require('moment');
const constants = require('./constants');
const attendance = require('../model/attendance');
const resources = require('../model/resource');


/**
 * @description Missing attendance Dates
 * @summary find missing attendance date for single resource/all resources
 * @param {empid} 
 * @returns array of dates
 */


/**
 * Find set difference
 * @param {Set} setA - Set from which elements to remove
 * @param {Set} setB - The set whose elements are removed from SetA
 * @returns {Set} - SetA - SetB
 */
function difference(setA, setB) {
    let _difference = new Set(setA)
    for (let elem of setB) {
        _difference.delete(elem)
    }
    return _difference
}

var missingDates = async (req, res) => {
    // const { empid } = req.body;
    const startingDate = moment(constants.constant_Data.DB_STARTS_DATE); // 31-Jul-2020
    const endDate = moment(new Date());
    var day = startingDate.clone();
    const df = 'DD-MMM-YYYY'; // date format
    var calendar = new Set();
    // create a calendar till today, exclude holidays
    for (var i = 0; i < endDate.diff(startingDate, 'days'); i++) {
        day = day.add(1, 'days');
        // check Sat Sun
        if (day.day() === 0 || day.day() === 6) {
            continue;
        }
        // else if (constants.constant_Data.HOLIDAYS_DATE.includes(day.format(df))) {
        //     continue;
        // }
        else {
            calendar.add(day.format(df));
        }
    }

    var missingDates = []
    try {
        // the below query returns distinct dates in an array
        var allUserData = await attendance.find().distinct('date');
        // find set difference = calendar - Set(allUserData), push that into the missingDates array
        missingDates.push.apply(missingDates, [...difference(calendar, new Set(allUserData))]);
        //if no dates found, send response else send dates
        if (Object.keys(missingDates).length === 0) {
            res.status(404).send({ message: "No missing dates found." });
        }
        else { res.status(200).send({ dates: missingDates }); }
    }
    catch (error) {
        res.status(500).send({ error: `${error}` });
    }
}

module.exports = {
    missingDates
}
