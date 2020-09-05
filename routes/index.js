var express = require('express');
var router = express.Router();

var Attendance=require("../modules/attendance-record")




/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/markattendance',Attendance.markAttendance)

//Attendance.authenticateToken,  Attendance.findIdfromemail, Attendance.is_weekend,


module.exports = router;
