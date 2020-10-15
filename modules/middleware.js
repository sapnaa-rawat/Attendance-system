const moment = require("moment");
const constants = require('../modules/constants');


const dateIsValid = (req, res, next) => {

    const {
        path
    } = req;
    const pathArr = path.split('/');
    const endPoints = pathArr[pathArr.length - 1];
    if (constants.constant_Data.ACCEPTED_URL_FOR_WEEKEND.indexOf(endPoints) > -1) {
        const bodydata = req.body;
        console.log(bodydata.length)
        if (bodydata.length > 1) {
            bodydata.map((item, index) => {
                const date = moment(item.date) //.format(constants.constant_Data.DATE_FORMAT);
                const isValid = date.isValid();
                if (isValid) {
                    const day = date.day();
                    const verifyDate = moment(date, constants.constant_Data.DATE_FORMAT).isAfter(constants.constant_Data.DB_STARTS_DATE);
                    if (verifyDate) {
                        if (day == 0 || day == 6) {
                            return res.status(200).json({
                                message: "no data for saturday and sunday change your date on: " + item.date
                            });
                        } else if (constants.constant_Data.HOLIDAYS_DATE.includes(date.format(constants.constant_Data.DATE_FORMAT))) {
                            return res.status(200).json({
                                message: "It's a holiday on: " + item.date
                            })
                        } else if (index == bodydata.length - 1) {
                            next();
                        }
                    }

                } else {
                    return res.status(400).json({
                        message: "invalid Date"
                    });
                }
            });
        } else {
            const date = moment(req.body.date) //.format(constants.constant_Data.DATE_FORMAT);
            const isValid = date.isValid();
            if (isValid) {
                const day = date.day();
                const verifyDate = moment(date, constants.constant_Data.DATE_FORMAT).isAfter(constants.constant_Data.DB_STARTS_DATE);
                if (verifyDate) {
                    if (day == 0 || day == 6) {
                        return res.status(200).json({
                            message: "no data for saturday and sunday change your date on: " + req.body.date
                        });
                    } else if (constants.constant_Data.HOLIDAYS_DATE.includes(date.format(constants.constant_Data.DATE_FORMAT))) {
                        return res.status(200).json({
                            message: "It's a holiday on: " + req.body.date
                        })
                    } else {
                        next();
                    }
                }

            } else {
                return res.status(400).json({
                    message: "invalid Date"
                });
            }


        }
    } else {
        return next();
    }
}

module.exports = dateIsValid