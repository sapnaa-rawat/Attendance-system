var moment = require('moment');
var today=moment().format('DD-MMM-YYYY');
var day = '03-sep-2020';
var exitsdate = moment(day, 'DD-MMM-YYYY').isAfter('31-jul-2020');
var tomorrow=moment(today).add(1,'days');
console.log(exitsdate);