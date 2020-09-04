var express = require('express');
const missingdate = require('../modules/missingdate');
var router = express.Router();
var checkAttendance=require("../modules/check")
var loginHandler = require('../modules/logIn');
router.get('/dailycheck',checkAttendance.holiday,checkAttendance.validation,checkAttendance.attendance);

const forget_password = require("../modules/forget_password");
var Attendance=require("../modules/attendance-record")
var weeklyAttendanceCheck=require('../modules/weeklyAttendance');

// Also has a validate middleware for authorising token on protected routes



router.route("/forgot_Password").post(forget_password.forgot_Password);
router.post('/markattendance',Attendance.markAttendance)
router.route("/checkWeeklyAttendance").get(weeklyAttendanceCheck.weeklyAttendance);
//,Attendance.authenticateToken,  Attendance.findIdfromemail
router.get('/missing',missingdate.missing);

router.post('/login', loginHandler.login);

module.exports = router;
// Attendance.authenticateToken,,  Attendance.findIdfromemail, Attendance.is_weekend