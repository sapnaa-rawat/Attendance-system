const express = require('express');
const missingdate = require('../modules/missingdate');
const router = express.Router();
const checkAttendance = require("../modules/dailyattendance")
const loginHandler = require('../modules/logIn');
const forget_password = require("../modules/forget_password");
const Attendance = require("../modules/attendance-record");
const weeklyAttendanceCheck = require('../modules/weeklyAttendanceString');
const register = require('../modules/register')
const deleteuser = require("../modules/deleteApi");
const addtoproject = require("../modules/projectApi");
const leaves = require('../modules/leaves');

router.post('/login', loginHandler.login); //login user API

router.route("/forgot_Password").post(forget_password.forgot_Password); //Forgot password API

router.post('/change_Password', loginHandler.validateToken, forget_password.change_Password); //Change PASSWORD

router.get('/dailycheck', loginHandler.validateToken, checkAttendance.validation, checkAttendance.holiday, checkAttendance.attendance);

router.post('/markattendance',loginHandler.validateToken,Attendance.markAttendance);

router.route("/checkWeeklyAttendance").get(loginHandler.validateToken, weeklyAttendanceCheck.findIdfromemail, weeklyAttendanceCheck.is_notweekend, weeklyAttendanceCheck.weeklyAttendance);

router.post('/register', register.validate, register.resourceExists, register.register); // Register new resource API

router.get('/missedattendance', loginHandler.validateToken, missingdate.missing);

router.route("/deleteuser").post(deleteuser.deleteUser);

router.route("/addtoproject").post(addtoproject.addUsertoProject);

router.post('/applyleave', loginHandler.validateToken, leaves.applyLeave);

router.get('/leaves',loginHandler.validateToken , leaves.getAll);

module.exports = router;