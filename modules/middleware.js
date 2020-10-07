const moment = require("moment");
const constants = require('../modules/constants');


const dateIsValid = (req, res, next) => {
    
    if (req.path == '/api/v1/dailycheck' || req.path == '/api/v1/markattendance' || req.path == '/api/v1/checkWeeklyAttendance' || req.path == '/api/v1/dailyleaves' || req.path == '/api/v1/weeklyleaves') {
        const date = moment(req.body.date);
        const week = date.day();
        const varifyDate = moment(date, constants.constant_Data.DATE_FORMATE).isAfter(constants.constant_Data.DB_STARTS_DATE);
        if (varifyDate == true) {

            if (week == 0 || week == 6) {
                return res.status(200).json({
                    message: "no data for saturday and sunday"
                });
            } else {
                next();
            }
        } else {
            return res.status(400).json({
                message: "invalid Date"
            });
        }
    } else {
        return next();
    }
}

module.exports =dateIsValid 