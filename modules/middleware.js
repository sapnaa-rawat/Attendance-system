const moment = require("moment");
const dateIsValid = (req, res, next) => {
    const date = moment(req.body.date);
    const week = date.day();
    const varifyDate = moment(date ,'DD-MMM-YYYY').isAfter('31-Jul-2020');
    if (varifyDate == true) {
        
    if (week == 0 || week == 6) {
        return res.status(200).json({ message: "no data for saturday and sunday" });
    }
    else  {
        next();
    }}
   
    else {
        return res.status(400).json({ message: "invalid Date" });
    }
}

module.exports=dateIsValid