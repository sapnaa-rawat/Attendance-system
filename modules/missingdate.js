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
 const missingdates = (req, res) => {
    var to_Date = moment(new Date()).format('DD-MMM-YYYY');
    var from_Date = moment(constants.constant_Data.DB_STARTS_DATE).format('DD-MMM-YYYY');
    var dates = [];
    for (var m = moment(from_Date); m.isSameOrBefore(to_Date); m.add(1, 'days')) {
        if (!(m.days() == 6 || m.days() == 0)) {
            dates.push(m.format('DD-MMM-YYYY'));
        }
    resources.find()

 }

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

var newMissingDates = async (req, res) => {
    const { empid } = req.body;
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
        else if (constants.constant_Data.HOLIDAYS_DATE.includes(day.format(df))) {
            continue;
        }
        else {
            calendar.add(day.format(df));
        }
    }
    // search criteria for query
    var filter = {};
    if (empid) {
        // if empid is provided, the query searches for that empid only, else gets all data
        filter['empid'] = empid;
    }
    // ALL attendances for each resource id - 
    var empAttendances = {};
    // ALL missing dates for each resource id - 
    var empMissingDate = {};
    var allUserData = await attendance.find(filter)
        .then(allUserData => {
            // segregate data for each empid bucket
            allUserData.forEach(doc => {
                let id = doc.empid;
                let date = doc.date;
                if (!empAttendances[id]) {
                    empAttendances[id] = new Set();
                }
                empAttendances[id].add(date);
            });
        })
        .then(val => {
            // Now remove attendance dates from calendar dates for each empid
            // The remaining dates are the missing dates 
            for (const key in empAttendances) {
                if (!empMissingDate[key]) {
                    empMissingDate[key] = [...difference(calendar, empAttendances[key])];
                }
            }
        })
        .then(val => {
            // dates found, now send response
            if (Object.keys(empMissingDate).length === 0) {
                res.status(404).send({ message: "No missing dates found." });
            }
            else {
                res.status(200).send(empMissingDate);
            }
        })
        .catch(err => res.status(500).send({ error: `${err}` }));
}

module.exports = {
    missingdates,
    newMissingDates
}
