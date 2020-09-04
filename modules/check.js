var moment = require("moment")
var empattendance = require("../model/attendance")


var arr = ['03-Aug-2020', '02-Oct-2020', '13-Nov-2020', '30-Nov-2020', '25-Dec-2020'];
function validation(req, res, next) {
    var date = req.body.date;
   
    var exitsdate = moment(date, 'DD-MMM-YYYY').isAfter('31-jul-2020')
    if (exitsdate === true) {
        next();
    }
    else {
        res.status(404).json({ message: "No data for "+date })
    }
}

async function attendance(req, res, next) {
    var date = req.body.date;
 
    var now = moment(date, 'DD-MMM-YYYY');

    if (now.isValid()) {
        var week = now.day();
        if (week == 0 || week == 6) {
            res.status(200).json({ message: "no data for saturday and sunday" })

        }
        else {

            var result = await empattendance.find({ "date": date});

            if (result.length===0) {
               return res.status(404).json({ message: "attendance not filled" });
            }
            res.status(200).send(result)
        }
    }
    else {
        res.status(404).json({ message: "invalid Date" })
    }
}

function holiday(req, res, next) {
    var date = req.body.date;
    

    for (var i = 0; i <= 9; i++) {
   
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