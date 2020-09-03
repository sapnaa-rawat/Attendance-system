var express = require('express');
var router = express.Router();
var checkAttendance=require("../modules/check")
var loginHandler = require('../modules/logIn');
router.post('/dailycheck',checkAttendance.holiday,checkAttendance.validation,checkAttendance.attendance);

const forget_password = require("../modules/forget_password");
var Attendance=require("../modules/attendance-record")

// Also has a validate middleware for authorising token on protected routes


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.route("/forgot_Password").post(forget_password.forgot_Password);
router.post('/markattendance',Attendance.authenticateToken,  Attendance.findIdfromemail,Attendance.markAttendance)


router.post('/login', loginHandler.login);

module.exports = router;
