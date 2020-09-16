const empattendance = require('../model/attendance');
const moment = require('moment');
const constants = require('./constants');

const leaves = ['PL', 'UPL', 'UCL', 'PCL'];
const holidays = constants.constant_Data.HOLIDAYS_DATE;

/**
 * Finds all leaves from start date (inclusive) till no of days (exclusive)
 * @param {Number} id - Optional
 * @param {Date} sdate - in moment format ('DD-MMM-YYYY')
 * @param {Number} days 
 */
const getLeavesFrom = async (id, sdate, days) => {
    const date_end = moment(sdate).add(parseInt(days), 'days').format('DD-MMM-YYYY');
    // search criteria for mongo query
    var filter = { date: { $gte: sdate, $lt: date_end, $nin: holidays }, "empattendance": { $in: leaves } };
    // if id not given, fetch data for all users involved in a project in the date range
    if (!id) {
        filter = { project: true, ...filter };
    }
    // if id is given, fetch all data only of that user in the date range
    else {
        filter = { empid: id, ...filter};
    }
    var leavesList = await empattendance.find({ project: true, ...filter }).sort({ date: 1 });
    if (leavesList.length === 0) {
        return [];
    }
    // formatt the data and omit excess info
    var result = leavesList.map(key => { return { "empid": key.empid, "leave": key.empattendance, "date": key.date } });
    // make sure all dates fall in the range between sdate and date_end
    var filtered_result = result.filter(val => {
        let d = moment(val.date);
        // to include the current day as well
        let sd = moment(sdate).subtract(1, 'day');
        let ed = moment(date_end);
        return (d.isBefore(ed) && d.isAfter(sd));
    });
    return filtered_result;
}

const dateIsValid = (req, res, next) => {
    var date = moment(req.body.date);
    var week = date.day();
    if (week == 0 || week == 6) {
        return res.status(200).json({ message: "no data for saturday and sunday" });
    }
    else if (date.isValid()) {
        next();
    }
    else {
        return res.status(400).json({ message: "invalid Date" });
    }
}

const dateIsMonday = (req, res, next) => {
    var date = moment(req.body.date);
    var week = date.day();
    if (week === 1) {
        next();
    }
    else {
        return res.status(200).json({ message: "Date is not the start of a week." });
    }
}

const getLeaveOnDate = async (req, res) => {
    var date = moment(req.body.date);
    var empid = req.body.empid;
    // Get leaves list for one day
    var result = await getLeavesFrom(empid, date.format('DD-MMM-YYYY'), 1);
    if (result.length === 0) {
        return res.status(404).json({ message: "No leaves record found" });
    }
    else {
        return res.status(200).json(result);
    }
}

const getWeeklyLeaves = async (req, res) => {
    const date = moment(req.body.date);
    const id = req.body.id;
    // Get leaves list for the week
    var result = await getLeavesFrom(id, date.format('DD-MMM-YYYY'), 6);
    if (result.length === 0) {
        res.status(404).json({ message: "No leaves record found" });
    }
    else {
        res.status(200).json(result);
    }
}

const getmonthlyLeaves = async (req, res) => {
    const d = new Date();
    const id = req.body.id;
    const month = req.body.month || d.getMonth();
    const year = d.getFullYear();
    if (!month) {
        return res.status(400).json({ message: "month not provided" });
    }
    // starting date of month
    const sdate = moment([year, month]);
    // days in month
    const days = sdate.daysInMonth();
    // get leaves for the month
    var result = await getLeavesFrom(id, sdate.format('DD-MMM-YYYY'), days - 1);
    if (result.length === 0) {
        res.status(404).json({ message: "No leaves record found" });
    }
    else {
        res.status(200).json(result);
    }
}

module.exports = { getLeaveOnDate, getWeeklyLeaves, getmonthlyLeaves, dateIsValid, dateIsMonday };
