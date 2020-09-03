var express = require('express');
const missingdate = require('../modules/missingdate');
var router = express.Router();

router.get('/missing',missingdate.missing);

module.exports = router;
