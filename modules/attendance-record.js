const attendance = require('../model/attendance');
const moment = require('moment');
const resources = require('../model/resource');


const check_Weekend = (req, res, next) => {
  let body = req.body;
  body.forEach((item) => {
    var verifyDate = moment(item.date, 'DD-MMM-YYYY').isAfter('31-jul-2020')
    var date = new Date(item.date);
    console.log(date.getDay(), verifyDate);
    if (date.getDay() == 0 || date.getDay() == 6 || (!(verifyDate))){
      return res.send({"msg": `holiday on this ${item.date} `})
    }
  })
  next();
}

const markAttendance = (req, res) => {
  let body = req.body;
  const empattendance_data = body.map((item) => {
    return item.empid;
  })

  resources.find({"id": empattendance_data, "project": true}, (err, result) => {
    if (err) {
      return err
    } 
    else {
      result.map((data) => {
        body.map((item) => {
          if (data.id == item.empid) {
            attendance.find({
              "empid": data.id,
              "date": item.date
            }, (err, result) => {
              if (err) {
                return err
              }
              if (result.length == 0) {

                let attendancedata = new attendance({
                  date: item.date,
                  empattendance: item.empattendance,
                  empid: data.id,
                  project: data.project

                });

                attendancedata
                  .save((err) => {
                    if (err) {
                      return res.send(404, {
                        message: "Not Found"
                      })
                    }
                  })
              }
              else {
                attendance.findOneAndUpdate({ "empid": data.id, "date": item.date }, { "empid": data.id, "date": item.date, $set: { "empattendance": item.empattendance }, "project": data.project }, (err) => {
                  if (err) { return err }
                })
              }
            })
          }
        })
      })
      res.send({ msg: "updated" });
    }
  })
}


module.exports = {
  markAttendance,
  check_Weekend
}
