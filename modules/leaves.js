var empattendance = require('../model/attendance');
var moment = require('moment');

const leaves = ['PL', 'UPL', 'UCL', 'PCL'];
var holidays = ['03-Aug-2020', '02-Oct-2020', '13-Nov-2020', '30-Nov-2020', '25-Dec-2020'];

/**
 * Finds all leaves from start date (inclusive) till no of days (exclusive)
 * @param {Number} id 
 * @param {Date(DD-MMM-YYYY)} sdate 
 * @param {Number} days 
 */
async function getLeavesFrom(id, sdate, days) {
    const date_end = moment(sdate).add(parseInt(days), 'days').format('DD-MMM-YYYY');
    if (!id) {
        var leavesList = await empattendance.find({ project: true, date: { $gte: sdate, $lt: date_end, $nin: holidays }, "empattendance": { $in: leaves } }).sort({ date: 1 });
    }
    else {
        leavesList = await empattendance.find({ empid: id, date: { $gte: sdate, $lt: date_end, $nin: holidays }, "empattendance": { $in: leaves } }).sort({ date: 1 });
    }
    if (leavesList.length === 0) {
        return [];
    }
    var result = leavesList.map(key => { return { "empid": key.empid, "leave": key.empattendance, "date": key.date } });
    // make sure all dates fall in the range between sdate and date_end
    var filtered_result = result.filter(val=>{
        let d = moment(val.date);
        let sd = moment(sdate).subtract(1,'day');
        let ed = moment(date_end);
        if(d.isBefore(ed) && d.isAfter(sd)){
            return true;
        }
        else{
            return false;
        }
    });
    return filtered_result;
}

function dateIsValid(req, res, next) {
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

function dateIsMonday(req, res, next) {
    var date = moment(req.body.date);
    var week = date.day();
    if (week === 1) {
        next();
    }
    else {
        return res.status(200).json({ message: "Date is not the start of a week." });
    }
}

async function getLeaveOnDate(req, res) {
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

async function getWeeklyLeaves(req, res) {
    const date = moment(req.body.date);
    const id = req.body.id;
    var result = await getLeavesFrom(id, date.format('DD-MMM-YYYY'), 6);
    if (result.length === 0) {
        res.status(404).json({ message: "No leaves record found" });
    }
    else {
        res.status(200).json(result);
    }
}

async function getmonthlyLeaves(req, res) {
    const d = new Date();
    const id = req.body.id;
    const month = req.body.month || d.getMonth();
    const year = d.getFullYear();
    if(!month){
        return res.status(400).json({message:"month not provided"});
    }
    // strating date of month
    const sdate = moment([year,month]);
    // days in month
    const days = sdate.daysInMonth();
    // get leaves of the month
    console.log(sdate.format('DD-MMM-YYYY'));
    console.log(days);
    var result = await getLeavesFrom(id, sdate.format('DD-MMM-YYYY'), days-1);
    if (result.length === 0) {
        res.status(404).json({ message: "No leaves record found" });
    }
    else {
        res.status(200).json(result);
    }
}

module.exports = { getLeaveOnDate, getWeeklyLeaves, getmonthlyLeaves, dateIsValid, dateIsMonday };
