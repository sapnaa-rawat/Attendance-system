const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var list = new Schema({
    holidayDate:['01-Jan-2020','21-Feb-2020','10-Mar-2020','10-Apr-2020','25-May-2020','03-Aug-2020','02-Oct-2020','13-Nov-2020','30-Nov-2020','25-Dec-2020']
    
})
var holidayList = mongoose.model("list", list);
module.exports = holidayList;
