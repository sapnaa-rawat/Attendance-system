var empattendance = require('../model/attendance');
var moment = require('moment');
const { attendance } = require('./dailyattendance');

const leaves = ['PL', 'UPL', 'UCL', 'PCL'];
var holidays = ['03-Aug-2020', '02-Oct-2020', '13-Nov-2020', '30-Nov-2020', '25-Dec-2020'];

async function getLeaveOnDate(req, res) {
    var date = moment(req.body.date);
    var empid = req.body.empid;

    if (date.isValid()) {
        var week = date.day();
        if (week == 0 || week == 6) {
            res.status(200).json({ message: "no data for saturday and sunday" });
        }
        else {
            var result = await getLeavesFrom(empid, date.format('DD-MMM-YYYY'), 1);
            if (result.length === 0) {
                res.status(404).json({ message: "No leaves record found" });
            }
            else {
                res.status(200).json(result);
            }
        }
    }

    else {
        res.status(400).json({ message: "invalid Date" })
    }
}

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
    return result;
}

async function getmonthlyLeaves(req, res) {
    const _date = moment(req.body.date);
    const id = req.body.id;
    if (_date.isValid()) {
        var result = await getLeavesFrom(id, _date.format('DD-MMM-YYYY'), 31);
        if (result.length === 0) {
            res.status(404).json({ message: "No leaves record found" });
        }
        else {
            res.status(200).json(result);
        }
    }
    else {
        res.status(400).json({ message: "invalid Date" });
    }
}

async function getWeeklyLeaves(req, res) {
    const _date = moment(req.body.date);
    const id = req.body.id;
    if (_date.isValid()) {
        var result = await getLeavesFrom(id, _date.format('DD-MMM-YYYY'), 6);
        if (result.length === 0) {
            res.status(404).json({ message: "No leaves record found" });
        }
        else {
            res.status(200).json(result);
        }
    }
    else {
        res.status(400).json({ message: "invalid Date" });
    }
}

module.exports = { getLeaveOnDate, getWeeklyLeaves };