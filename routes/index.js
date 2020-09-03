var express = require('express');
var router = express.Router();
const forget_password = require("../modules/forget_password");
var Attendance=require("../modules/attendance-record")
var weeklyAttendanceCheck=require('../modules/weeklyAttendance');

// Also has a validate middleware for authorising token on protected routes
var loginHandler = require('../modules/logIn');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.route("/forgot_Password").post(forget_password.forgot_Password);
router.post('/markattendance',Attendance.markAttendance)
router.route("/checkWeeklyAttendance").get(weeklyAttendanceCheck.weeklyAttendance);
//,Attendance.authenticateToken,  Attendance.findIdfromemail

router.get('/login', loginHandler.login);

module.exports = router;
