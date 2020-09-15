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
const show_Holidays = require('../modules/mandatoryholiday');

/**
 * @swagger
 * /register:
 *    post:
 *      tags: 
 *          - "Register & Login"
 *      summary: "Register"
 *      description: "Register"
 *      operationId: "Register"
 *      consumes:
 *          - "application/json"
 *      produces:
 *          - "application/json"
 *      parameters:
 *          - in: "body"
 *      name: "body"
 *      required: true
 *      schema: 
 *          $ref: '../Personal.yaml#/definitions/register'
 *      responses:
 *          '201':
 *          description: Successfully created user
 */
router.post('/register', register.validate, register.resourceExists, register.register); // Register new resource API

/**
 * @swagger
 * /login:
 *      $ref : 'https://github.com/sapnaa-rawat/Attendance-system/blob/amanBranch/swagger_test.yaml#/paths/login'
 */
router.post('/login', loginHandler.login); //login user API

router.route("/forgot_Password").post(forget_password.forgot_Password); //Forgot password API

router.route("/deleteuser").post(deleteuser.deleteUser);

router.route("/addtoproject").post(addtoproject.addUsertoProject);

//Shows all the mandatory holidays

router.route("/addtoproject").post(show_Holidays.show_Holidays); 

//router.use(loginHandler.validateToken); //using Auth middleware for below API's

router.post('/change_Password', forget_password.change_Password); //Change PASSWORD

router.post('/dailycheck', checkAttendance.validation, checkAttendance.holiday, checkAttendance.attendance);

router.post('/markattendance', Attendance.check_Weekend, Attendance.markAttendance);

router.route("/checkWeeklyAttendance").get(weeklyAttendanceCheck.is_notweekend, weeklyAttendanceCheck.weeklyAttendance);

router.get('/missedattendance', missingdate.missingDates);

router.get('/dailyleaves', leaves.dateIsValid, leaves.getLeaveOnDate);

router.get('/weeklyleaves', leaves.dateIsValid, leaves.dateIsMonday, leaves.getWeeklyLeaves);

router.get('/monthlyleaves', loginHandler.validateToken, leaves.getmonthlyLeaves);

router.post('/mandatoryholiday', show_Holidays.validate, show_Holidays.holiday);

module.exports = router;
