var express = require('express');
var router = express.Router();
var data=require("../modules/check")

router.post('/dailycheck', data.validation,data.holiday,);

module.exports = router;
