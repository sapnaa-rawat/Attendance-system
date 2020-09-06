var express = require('express');
const missingdate = require('../modules/missingdate');
var router = express.Router();
var checkAttendance=require("../modules/dailyattendance")
var loginHandler = require('../modules/logIn');
const forget_password = require("../modules/forget_password");
var Attendance=require("../modules/attendance-record");
var weeklyAttendanceCheck=require('../modules/weeklyAttendanceString');
var register = require('../modules/register')
const deleteuser=require("../modules/deleteApi");
const addtoproject=require("../modules/projectApi");

router.post('/login', loginHandler.login); //login user API

router.route("/forgot_Password").post(forget_password.forgot_Password); //Forgot password API

router.post('/change_Password', forget_password.change_Password);

router.get('/dailycheck',loginHandler.validateToken,checkAttendance.validation,checkAttendance.holiday,checkAttendance.attendance);

router.post('/markattendance',loginHandler.validateToken,  Attendance.findIdfromemail, Attendance.markAttendance);

router.post('/markattendance',Attendance.markAttendance)
router.route("/checkWeeklyAttendance").get(loginHandler.validateToken,weeklyAttendanceCheck.findIdfromemail,weeklyAttendanceCheck.is_notweekend,weeklyAttendanceCheck.weeklyAttendance);
router.post('/register', register.validate, register.resourceExists, register.register); // Register new resource API
//loginHandler.validateToken,weeklyAttendanceCheck.findIdfromemail,

router.get('/missing',loginHandler.validateToken,missingdate.missing);
router.route("/deleteuser").post(deleteuser.deleteUser)
router.route("/addtoproject").post(addtoproject.addUsertoProject)


module.exports = router;
// Attendance.authenticateToken,,  Attendance.findIdfromemail, Attendance.is_weekend