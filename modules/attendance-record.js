var attendance = require('../model/attendance')
var Employee = require('../model/resource');
var moment = require('moment');
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');
const authenticateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token)
    const decodedToken = jwt.verify(token, "any$random$auth$token");
   
console.log(decodedToken)
    req.user = {
      email: decodedToken.email
    };
    console.log(user)
    next();
  } catch (err) {
    res.status(401).json({
      message: "Auth failed!"
    });
  }

}

function findIdfromemail(req, res, next) {
  //let email = req.user.email;
  let email=localStorage.getItem('email');
  Employee.findOne({
    "email": email
  }).exec(function (error, response) {
    if (error) return res.status(422).send("something went wrong")
    if (response)
      req.id = response.id;
      req.project=response.project;
    next()
  })
}

function markAttendance(req, res, next) {
  //console.log(req.body);
  let Date = req.body.date;
  //console.log(Date);
  let empId=req.id;
  //let empId = req.body.empid;
  let project=req.project;
  let empAttendance = req.body.empattendance;
  Date = moment(req.body.date).format("DD-MMM-YYYY");
  let attendancedata = new attendance({
    date: Date,
    empattendance: empAttendance,
    empid: empId,
    project:project
  });
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