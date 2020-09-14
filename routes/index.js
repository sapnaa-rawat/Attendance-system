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
const add=require('../modules/mandatoryholiday')
router.post('/login', loginHandler.login); //login user API

router.route("/forgot_Password").post(forget_password.forgot_Password); //Forgot password API

router.post('/change_Password', loginHandler.validateToken, forget_password.change_Password); //Change PASSWORD

router.get('/dailycheck',  checkAttendance.validation, checkAttendance.holiday, checkAttendance.attendance);

router.post('/markattendance', loginHandler.validateToken, Attendance.markAttendance);
// Attendance.is_weekend,
router.route("/checkWeeklyAttendance").get(loginHandler.validateToken, weeklyAttendanceCheck.is_notweekend, weeklyAttendanceCheck.weeklyAttendance);

router.post('/register', register.validate, register.resourceExists, register.register); // Register new resource API

router.get('/missedattendance', loginHandler.validateToken, missingdate.missing);

router.route("/deleteuser").post(deleteuser.deleteUser);

router.route("/addtoproject").post(addtoproject.addUsertoProject);

router.get('/dailyleaves', loginHandler.validateToken, leaves.dateIsValid, leaves.getLeaveOnDate);

router.get('/weeklyleaves', loginHandler.validateToken, leaves.dateIsValid, leaves.dateIsMonday, leaves.getWeeklyLeaves);

router.get('/monthlyleaves', loginHandler.validateToken, leaves.getmonthlyLeaves);
router.post('/mandatoryholiday',add.validate,add.holiday);

module.exports = router;