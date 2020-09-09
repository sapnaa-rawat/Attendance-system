var empattendance = require('../model/attendance');
var moment = require('moment');

const leaves = ['PL', 'UPL', 'UCL', 'PCL'];

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
                var temp = result.map(key => { return { "empid": key.empid, "status": key.empattendance, "date": key.date } });
                return res.status(200).json(temp)
            }
            var result = await empattendance.find({ "empid": empid, "date": date, "empattendance": { $in: leaves } });

            if (result.length === 0) {
                return res.status(404).json({ message: "attendance not filled" });
            }

            res.status(200).json({ "empid": result[0].empid, "status": result[0].empattendance, "date": result[0].date });


        }
    }

    else {
        res.status(400).json({ message: "invalid Date" })
    }
}

module.exports = { getLeaveOnDate };