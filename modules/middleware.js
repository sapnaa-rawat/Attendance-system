const moment = require("moment");
const constants = require('../modules/constants');


const dateIsValid = (req, res, next) => {

    const {
        path
    } = req;
    const pathArr = path.split('/');
    const endPoints = pathArr[pathArr.length - 1];
    if (constants.constant_Data.ACCEPTED_URL_FOR_WEEKEND.indexOf(endPoints) > -1) {
        const date = moment(req.body.date) //.format(constants.constant_Data.DATE_FORMAT);
        const isValid = date.isValid();
        if (isValid) {
            const day = date.day();
            const verifyDate = moment(date, constants.constant_Data.DATE_FORMAT).isAfter(constants.constant_Data.DB_STARTS_DATE);
            if (verifyDate) {
                if (day == 0 || day == 6) {
                    return res.status(200).json({
                        message: "no data for saturday and sunday"
                    });
                } else {
                    next();
                }
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

module.exports = dateIsValid