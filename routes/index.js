var express = require('express');
const missingdate = require('../modules/missingdate');
var router = express.Router();
const forget_password = require("../modules/forget_password");
var Attendance=require("../modules/attendance-record")


router.route("/forgot_Password").post(forget_password.forgot_Password);
router.post('/markattendance',Attendance.markAttendance)
router.get('/missing',missingdate.missing);


module.exports = router;
// Attendance.authenticateToken,,  Attendance.findIdfromemail, Attendance.is_weekend