var express = require('express');
const missingdate = require('../modules/missingdate');
var router = express.Router();
var checkAttendance=require("../modules/dailyattendance")
var loginHandler = require('../modules/logIn');
const forget_password = require("../modules/forget_password");
var Attendance=require("../modules/attendance-record");
var weeklyAttendanceCheck=require('../modules/weeklyAttendance');
var register = require('../modules/register')

router.post('/login', loginHandler.login); //login user API

router.route("/forgot_Password").post(forget_password.forgot_Password); //Forgot password API

router.post('/dailycheck',loginHandler.validate,checkAttendance.validation,checkAttendance.holiday,checkAttendance.attendance);

router.post('/markattendance',Attendance.markAttendance);

router.route("/checkWeeklyAttendance").get(weeklyAttendanceCheck.weeklyAttendance);

router.post('/register', register.validate, register.resourceExists, register.register);
//,Attendance.authenticateToken,  Attendance.findIdfromemail

router.get('/missing', missingdate.missing);

module.exports = router;
// Attendance.authenticateToken,,  Attendance.findIdfromemail, Attendance.is_weekend