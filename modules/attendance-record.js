var attendance = require('../model/attendance')
var Employee = require('../model/resource');
var moment = require('moment');
var moment = require('moment-timezone');





const authenticateToken = (req, res, next) => {

    try {

        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "req.session.privatekey");
        req.user = {
            email: decodedToken.email
        };

        next();
    } catch (err) {
        res.status(401).json({
            message: "Auth failed!"
        });
    }

}

function findIdfromemail(req, res, next) {
  let email = req.user.email;
  resourceModel.findOne({
    "email": email
  }).exec(function (error, response) {
    if (error) return res.status(422).send("something went wrong")
    if (response)
      req.id = response.id;
    next()
  })
}

function markAttendance(req, res, next) {
    let Date = req.body.date;
    //let empId=req.id;
    let empId = req.body.empid;
    let empAttendance = req.body.empattendance;
    let project=req.body.project;
    Date = moment(req.body.date).tz("Asia/Kolkata").format("DD-MMM-YYYY");

    console.log(Date);
    let attendancedata = new attendance({
        date: Date,
        empattendance: empAttendance,
        empid: empId,
        project:project
    });
    console.log(attendancedata)
    attendancedata
        .save()
        .then((doc) => {
            res.status(200).json({
                message: "attendance marked successfully",
                results: doc,
            });
        })
        .catch((err) => {
            console.log(err);
            res.send({
                message: "not marked"
            });
        });
}

function is_weekend(req, res, next) {
  let dateforsearch = req.body.date;
  var dt = new Date(dateforsearch);
  var verifyDate = moment(dateforsearch, 'DD-MMM-YYYY').isAfter('31-jul-2020')

  if (dt.getDay() == 0 && dt.getDay() == 6 && verifyDate == true) {
    return res.send(holiday);
  }
  return res.status(422).send({
    msg: 'not a valid date to find attendance of whole week'
  });
}

module.exports = {
  markAttendance,
  authenticateToken,
  findIdfromemail,
  is_weekend
}
