var express = require('express');
const missingdate = require('../modules/missingdate');
var router = express.Router();
var checkAttendance = require("../modules/dailyattendance")
var loginHandler = require('../modules/logIn');
const forget_password = require("../modules/forget_password");
var Attendance = require("../modules/attendance-record");
var weeklyAttendanceCheck = require('../modules/weeklyAttendanceString');
var register = require('../modules/register')
const deleteuser = require("../modules/deleteApi");
const addtoproject = require("../modules/projectApi");
var leaves = require('../modules/leaves');

router.post('/login', loginHandler.login); //login user API

router.route("/forgot_Password").post(forget_password.forgot_Password); //Forgot password API

router.route("/deleteuser").post(deleteuser.deleteUser);

router.route("/addtoproject").post(addtoproject.addUsertoProject);

router.post('/register', register.validate, register.resourceExists, register.register); // Register new resource API

router.use(loginHandler.validateToken); //using Auth middleware for below API's

router.post('/change_Password', forget_password.change_Password); //Change PASSWORD

router.get('/dailycheck', checkAttendance.validation, checkAttendance.holiday, checkAttendance.attendance);

router.post('/markattendance', Attendance.check_Weekend, Attendance.markAttendance); 

router.route("/checkWeeklyAttendance").get(weeklyAttendanceCheck.is_notweekend, weeklyAttendanceCheck.weeklyAttendance);

router.get('/missedattendance', missingdate.missingdates);

router.get('/dailyleaves', leaves.dateIsValid, leaves.getLeaveOnDate);

router.get('/weeklyleaves', leaves.dateIsValid, leaves.dateIsMonday, leaves.getWeeklyLeaves);

router.get('/monthlyleaves', leaves.getmonthlyLeaves);

module.exports = router;