const moment = require('moment');
const constants = require('./constants');
const attendance = require('../model/attendance');
const resources = require('../model/resource');


/**
 * @description Missing attendance Dates
 * @summary find missing attendance date for single resource/all resources
 * @param {empid} 
 * @returns array of dates
 */

 
const missingdates = (req, res) => {
    var id = req.body.empid;
    var to_Date = moment(new Date()).format('DD-MMM-YYYY');
    var from_Date = moment(constants.constant_Data.DB_STARTS_DATE).format('DD-MMM-YYYY');
    var dates = [];
    for (var m = moment(from_Date); m.isSameOrBefore(to_Date); m.add(1, 'days')) {
        if (!(m.days() == 6 || m.days() == 0)) {
            dates.push(m.format('DD-MMM-YYYY'));
        }
    }
    var filtered_holidays_Dates = dates.filter((item) => {
        if (!(constants.constant_Data.HOLIDAYS_DATE.includes(item))) {
            return item
        }
    });
    if(id){
        attendance.find({ "empid": id, "date": filtered_holidays_Dates, "project": true }, (err, result) => {
            if (err) { return err }
            var filtered__Dates = filtered_holidays_Dates.filter((dates) => {
                var status = true;
                result.map((item) => {
                    if (dates == item.date) {
                        status = false;
                    }
                })
                return status;
            })
            res.send(filtered__Dates);
        })
    }
    else {
        resources.find({ "project": true }, (err, resource) => {
        const empid = resource.map((item) => {
            return item.id;
        })
        attendance.find({ "empid": empid, "date": filtered_holidays_Dates, "project": true }, (err, result) => {
            if (err) { return err }
            var emp = [];
            resource.forEach((user) => {
                var filtered_users = result.filter((att) => {
                    return user.id == att.empid;
                })
                var filtered__Dates = filtered_holidays_Dates.filter((dates) => {
                    var status = true;
                    filtered_users.forEach((item) => {
                        if (dates == item.date) {
                            status = false;
                        }
                    })
                    return status;
                })
                let data = { "id": user.id, "Missing Dates": filtered__Dates }
                emp.push(data);
            })
            res.send(emp);
        })
    })
}

}

module.exports = {
    missingdates
}
