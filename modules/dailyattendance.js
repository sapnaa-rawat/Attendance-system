const moment = require("moment");
const empattendance = require("../model/attendance");
const holidays = require("../model/holiday");
const constants=require('../modules/constants');



const attendance = async (req, res, next) => {
    const {date, empid} = req.body;
    const now = moment(date, constants.constant_Data.DATE_FORMATE);
    const week = now.day();
    try {
        const find = {
            project: true
        };
        if (!!empid) {
            find.empid = empid;
        }
        if (week == 0 || week == 6) {
            res.status(200).json({message: "no data for saturday and sunday"});
        } else {
            find.date = date;
            const project = {
                "_id": 1,
                "date": 1,
                "empattendance": 1,
                "empid": 1,
                "name": "$employee.name"
            }
            const result = await empattendance.aggregate([
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
                }
            ]);
            if (result.length === 0) {
                return res.status(404).json({message: "attendance not filled"});
            }
            return res.status(200).json(result);
        }
    } catch
        (err) {
        res.status(404).json(err);
    }
}

async function holiday(req, res, next) {
    const {date} = req.body;
    const result = await holidays.findOne({"holidayDate": date})
    if (result) {
        res.status(200).json({message: "holiday"});
    }
    next();
}

module.exports = {
    holiday,
    attendance

}
