const moment = require('moment');
const attendances = require('../model/attendance');
const constants=require('../modules/constants');


const check_Weekend = (req, res, next) => {
  let body = req.body;
  body.forEach((item) => {
    const verifyDate = moment(item.date, constants.constant_Data.DATE_FORMATE).isAfter(constants.constant_Data.DB_STARTS_DATE)
    const date = new Date(item.date);
    if (date.getDay() == 0 || date.getDay() == 6 || (!(verifyDate))){
      return res.send({"msg": `holiday on this ${item.date} `})
    }
  })
  next();
}

const markAttendance = async (req, res) => {
  const body = req.body;
  const queryMap = body.map(async (item) => {
      return await attendances.findOneAndUpdate({
        "empid": item.empid,
        "date": item.date
      }, {$set: {empattendance: item.empattendance, project: true}}, {upsert: true});
  });
  Promise.all(queryMap).then(([...results]) => res.status(200).send({"message":"ok",results})).catch((err) => res.status(200).send(err));
}


module.exports = {
  markAttendance,
  check_Weekend
}
