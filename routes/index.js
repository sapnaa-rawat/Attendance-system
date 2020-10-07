const express = require('express');
const router = express.Router();
const missingdate = require('../modules/missingdate');
const checkAttendance = require("../modules/dailyattendance")
const loginHandler = require('../modules/logIn');
const forget_password = require("../modules/forget_password");
const Attendance = require("../modules/attendance-record");
const weeklyAttendanceCheck = require('../modules/weeklyAttendanceString');
const register = require('../modules/register')
const deleteuser = require("../modules/deleteApi");
const addtoproject = require("../modules/projectApi");
const leaves = require('../modules/leaves');
const show_Holidays = require('../modules/mandatoryholiday');
const isnotweekend=require('../modules/middleware');

router.post('/register', register.validate, register.resourceExists, register.register); // Register new resource API

router.post('/login', loginHandler.login); //login user API

router.post("/forgot_Password", forget_password.forgot_Password); //Forgot password API

//Shows all the mandatory holidays

router.get("/holidays", show_Holidays.show_Holidays);

router.post("/deleteuser", deleteuser.deleteUser);

router.post("/addtoproject", addtoproject.addUsertoProject);

router.post('/change_Password', forget_password.change_Password); //Change PASSWORD

router.post('/dailycheck', isnotweekend, checkAttendance.holiday, checkAttendance.attendance);

router.post('/markattendance', isnotweekend, Attendance.markAttendance);

router.post('/checkWeeklyAttendance',isnotweekend, weeklyAttendanceCheck.weeklyAttendance);

router.get('/missedattendance', missingdate.missingDates);

router.post('/dailyleaves',  isnotweekend, leaves.getLeaveOnDate);

router.post('/weeklyleaves', isnotweekend, leaves.dateIsMonday, leaves.getWeeklyLeaves);

router.post('/monthlyleaves', leaves.getmonthlyLeaves);

router.post('/mandatoryholiday', show_Holidays.validate, show_Holidays.holiday);

module.exports = router;
