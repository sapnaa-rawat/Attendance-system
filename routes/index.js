var express = require('express');
var router = express.Router();
const forget_password = require("../modules/forget_password");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.route("/forgot_Password").post(forget_password.forgot_Password);


module.exports = router;
