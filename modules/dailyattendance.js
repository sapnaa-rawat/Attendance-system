var moment = require("moment")
var empattendance = require("../model/attendance");
const { json } = require("body-parser");


var arr = ['03-Aug-2020', '02-Oct-2020', '13-Nov-2020', '30-Nov-2020', '25-Dec-2020'];
function validation(req, res, next) {
    var date = req.body.date;

    var exitsdate = moment(date, 'DD-MMM-YYYY').isAfter('31-jul-2020')
    if (exitsdate === true) {
        next();
    }
    else {
        res.status(422).json({ message: "No data for " + date })
    }
}

async function attendance(req, res, next) {
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
                var result = await empattendance.find({ "date": date ,"project":true});

                if (result.length === 0) {
                    return res.status(400).json({ message: "attendance not filled" });
                }
                var temp = [];
                result.forEach(async function (key) {

                    temp.push({ "empid": key.empid, "status": key.empattendance, "date": key.date });
                });
                return res.status(200).json(temp)
            }
            var result = await empattendance.find({ "date": date, "empid": empid });

            if (result.length === 0) {
                return res.status(400).json({ message: "attendance not filled" });
            }
            result.forEach(key => {
                res.status(200).json({ "empid": key.empid, "status": key.empattendance, "date": key.date })

            });
        }
    }

    else {
        res.status(404).json({ message: "invalid Date" })
    }
}

function holiday(req, res, next) {
    var date = req.body.date;


    for (var i = 0; i <= 4; i++) {

        if (arr[i] == date) {

            res.status(200).json({ message: "mandatory holiday" })

        }
    }
    next();
}

module.exports = {
    holiday,
    validation,
    attendance

}