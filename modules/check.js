var moment = require("moment")
var holidays=require("../model/holiday")
function validation(req, res, next) {
    var date = req.body;
    var day = Object.values(date);
   
    var exitsdate = moment(day, 'DD-MMM-YYYY').isAfter('31-jul-2020')

    if (exitsdate === true) {
        next();
    }
    else {
        res.status(404).json({ message: `no data for ${day}` })
    }
}
function holiday(req, res,next) {
    var date = req.body;
    var day = Object.values(date);
    var now = moment(day, 'DD-MMM-YYYY');
    var holiday=holidays.findOne({holidayDate:day});
console.log(holiday)
    if (now.isValid()) {
        var week = now.day();
        if (week == 0 || week == 6) {
            res.status(200).json({ message: "no data for saturday and sunday" })
        
        }
        if(holiday==true){
            res.status(200).json({message:"mandatory leave"})
        }
        else {
            res.status(200).json({ message: "invalid Date" })
        }
    }
    else {
        res.status(404).json({ message: "invalid Date" })
    }
}





module.exports = {
    holiday,
    validation,
   
}