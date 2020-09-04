var express = require('express');
const missingdate = require('../modules/missingdate');
var router = express.Router();
var checkAttendance=require("../modules/check")
var loginHandler = require('../modules/logIn');
<<<<<<< HEAD
router.get('/dailycheck',checkAttendance.holiday,checkAttendance.validation,checkAttendance.attendance);

=======
>>>>>>> 6ee48a376c6a4809eeb41231529dcc7aadbf4c91
const forget_password = require("../modules/forget_password");
var Attendance=require("../modules/attendance-record");
var weeklyAttendanceCheck=require('../modules/weeklyAttendance');

router.post('/login', loginHandler.login); //login user API

router.route("/forgot_Password").post(forget_password.forgot_Password); //Forgot password API

// Also has a validate middleware for authorising token on protected routes

router.post('/dailycheck',loginHandler.validate,checkAttendance.holiday,checkAttendance.validation,checkAttendance.attendance);

router.post('/markattendance',Attendance.markAttendance);

router.route("/checkWeeklyAttendance").get(weeklyAttendanceCheck.weeklyAttendance);

//,Attendance.authenticateToken,  Attendance.findIdfromemail

router.get('/missing', missingdate.missing);

module.exports = router;
// Attendance.authenticateToken,,  Attendance.findIdfromemail, Attendance.is_weekend