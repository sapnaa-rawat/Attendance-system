const holidayList = require("../model/holiday");
const moment = require("moment")

const holiday = (req, res) => {
    const date = req.body;

    let holidays = holidayList({
        holidayDate: date,

    });
    holidays.save().then(doc => res.status(201).json({ "message": "date added" })).catch(err => { res.status(404).json({ "message": "invalid data" }) })
}


const validate = (req, res, next) => {
    if (!req.body) {
        return res.status(422).json({ message: "please provide dates" });
    }
    next();
}

const show_Holidays = (req, res, next) => {
    holiday_List = holidayList.find().catch((err) => err);
    res.send(holiday_List);
}


module.exports = {
    holiday,
    validate,
    show_Holidays
}
