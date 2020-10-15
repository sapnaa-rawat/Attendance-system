const moment = require('moment-timezone')
const attendanceModel = require('../model/attendance');
const constants=require('../modules/constants');


const weeklyAttendance = async (req, res, next) => {
    const id = req.body.id;
    const dateforsearch = moment(req.body.date).format(constants.constant_Data.DATE_FORMAT);
    // ******** Getting rid of loop ******** //
    // end date is non inclusive (because of using $lt and not $lte), so add 6 instead of 5
    const enddate = moment(dateforsearch).add(6, 'days').format(constants.constant_Data.DATE_FORMAT);
    const project = {
        "_id": 1,
        "date": 1,
        "empattendance": 1,
        "empid": 1,
        "name": "$employee.name"
    }
    const find = {
        date: {$gte: dateforsearch, $lt: enddate}
    }
    if (!!id) {
        find.empid = id;
    }
    const userdata = await attendanceModel.aggregate([
        {
            $match: find
        },
        {
            $lookup: {
                from: "resources", // collection to join
                localField: "empid",//field from the input documents
                foreignField: "id",//field from the documents of the "from" collection
                as: "employee"// output array field
            }
        },
        {
            $unwind: '$employee'
        },
        {
            $project: project
        },
        {
            $sort: {date: 1}
        }
    ]);
    console.log(userdata);
    if (userdata.length === 0) {
        return res.status(200).json({message: "attendance not marked for this week"});
    }
    return res.status(200).send(userdata);
}

module.exports = {
    weeklyAttendance
}
