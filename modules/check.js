var moment = require("moment")

function validation(req, res, next) {
    var date = req.body;
    var day = Object.values(date);
    console.log(moment(day, 'DD-MMM-YYYY'))
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
    if (now.isValid()) {
        var week = now.day();
        if (week == 0 || week == 6) {
            res.status(200).json({ message: "no data for saturday and sunday" })
        }
        else {
            next();
        }
    }
    else {
        res.status(404).json({ message: "invalid Date" })
    }
}
function validateDate(req,res,next) {
    try {var date = req.body;
        var day = Object.values(date);
        console.log(new Date(day).toISOString());
        new Date(day).toISOString();
        next();
    } catch (e) { 
        res.status(404).json({ message: `no data for ${day}` }); 
    }
}




module.exports = {
    holiday,
    validation,
    validateDate
}