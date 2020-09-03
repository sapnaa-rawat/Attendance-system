var express = require('express');
var router = express.Router();
var data=require("../modules/check")
var loginHandler = require('../modules/logIn');
router.post('/dailycheck', data.validation,data.holiday);

const forget_password = require("../modules/forget_password");

// Also has a validate middleware for authorising token on protected routes


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.route("/forgot_Password").post(forget_password.forgot_Password);

router.post('/login', loginHandler.login);

module.exports = router;
