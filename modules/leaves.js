var empattendance = require('../model/attendance');
var moment = require('moment');
const { attendance } = require('./dailyattendance');

const leaves = ['PL', 'UPL', 'UCL', 'PCL'];
var holidays = ['03-Aug-2020', '02-Oct-2020', '13-Nov-2020', '30-Nov-2020', '25-Dec-2020'];

async function getLeaveOnDate(req, res) {
    var date = req.body.date;
    var empid = req.body.empid;
    var now = moment(date, 'DD-MMM-YYYY');

    if (now.isValid()) {
        var week = now.day();
        if (week == 0 || week == 6) {
            res.status(200).json({ message: "no data for saturday and sunday" })

        }
        else {
            if (empid === undefined) {
                var result = await empattendance.find({ "date": date, "project": true, "empattendance": { $in: leaves } });

                if (result.length === 0) {
                    return res.status(404).json({ message: "No leaves record found" });
                }
                var temp = result.map(key => { return { "empid": key.empid, "leave": key.empattendance, "date": key.date } });
                return res.status(200).json(temp);
            }
            var result = await empattendance.find({ "empid": empid, "date": date, "empattendance": { $in: leaves } });

            if (result.length === 0) {
                return res.status(404).json({ message: "No leaves record found" });
            }

            res.status(200).json({ "empid": result[0].empid, "leave": result[0].empattendance, "date": result[0].date });


        }
    }

    else {
        res.status(400).json({ message: "invalid Date" })
    }
}

async function getWeeklyLeaves(req, res) {
    const date = req.body.date;
    const _date = moment(req.body.date, 'DD-MMM-YYYY');
    const id = req.body.id;
    const date_end = _date.clone().add(5, 'days').format('DD-MMM-YYYY');
    if (_date.isValid()) {
        if (!id) {
            var leavesList = await empattendance.find({ project: true, date: { $gte: date, $lte: date_end, $nin: holidays }, "empattendance": { $in: leaves } }).sort({ date: 1 });
        }
        else {
            leavesList = await empattendance.find({ empid: id, date: { $gte: date, $lte: date_end, $nin: holidays }, "empattendance": { $in: leaves } }).sort({ date: 1 });
        }
        if (leavesList.length === 0) {
            return res.status(404).json({ message: "No leaves record found" });
        }
        var result = leavesList.map(key => { return { "empid": key.empid, "leave": key.empattendance, "date": key.date } });
        return res.status(200).json(result)
    }
    else {
        res.status(400).json({ message: "invalid Date" });
    }
}

module.exports = { getLeaveOnDate, getWeeklyLeaves };