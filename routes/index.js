var express = require('express');
var router = express.Router();
const forget_password = require("../modules/forget_password");

// Also has a validate middleware for authorising token on protected routes
var loginHandler = require('../modules/logIn');
var registerhandler = require('../modules/register');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.route("/forgot_Password").post(forget_password.forgot_Password);

router.get('/login', loginHandler.login);

router.post('/register', registerhandler.register);

router.get('/register', registerhandler.registerPage);

module.exports = router;
