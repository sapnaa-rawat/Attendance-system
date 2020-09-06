var express = require('express');
var router = express.Router();
var checkAttendance=require("../modules/check")
var loginHandler = require('../modules/logIn');
router.post('/dailycheck',loginHandler.validate,checkAttendance.holiday,checkAttendance.validation,checkAttendance.attendance);

const forget_password = require("../modules/forget_password");
var Attendance=require("../modules/attendance-record")
var weeklyAttendanceCheck=require('../modules/weeklyAttendance');

// Also has a validate middleware for authorising token on protected routes


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.route("/forgot_Password").post(forget_password.forgot_Password);
router.post('/markattendance',Attendance.markAttendance)
router.route("/checkWeeklyAttendance").get(weeklyAttendanceCheck.is_notweekend,weeklyAttendanceCheck.weeklyAttendance);
//,Attendance.authenticateToken,  Attendance.findIdfromemail

router.post('/login', loginHandler.login);

module.exports = router;
