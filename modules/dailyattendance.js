const moment = require("moment");
const empattendance = require("../model/attendance");
const holidays=require("../model/holiday");


const validation = (req, res, next) => {
    var date = req.body.date;

    var exitsdate = moment(date, 'DD-MMM-YYYY').isAfter('31-jul-2020')
    if (exitsdate === true) {
        next();
    }
    else {
        res.status(422).json({ message: "No data for " + date })
    }
}

const attendance = async (req, res, next) => {
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
                var result = await empattendance.find({ "date": date, "project": true });

                if (result.length === 0) {
                    return res.status(404).json({ message: "attendance not filled" });
                }
                var temp = [];
                result.forEach(function (key) {

                    temp.push({ "empid": key.empid, "status": key.empattendance, "date": key.date });
                });
                return res.status(200).json(temp)
            }
            var result = await empattendance.find({ "empid": empid, "date": date });

            if (result.length === 0) {
                return res.status(404).json({ message: "attendance not filled" });
            }

            res.status(200).json({ "empid": result[0].empid, "status": result[0].empattendance, "date": result[0].date });


        }
    }

    else {
        res.status(404).json({ message: "invalid Date" })
    }
}

async function holiday(req, res, next) {
    var date = req.body.date;
  var result=await holidays.findOne({"holidayDate":date})
if(result){
    res.status(200).json({message:"holiday"})
}
next();
}

module.exports = {
    holiday,
    validation,
    attendance

}