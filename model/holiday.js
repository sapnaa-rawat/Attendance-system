const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var list = new Schema({
    holidayDate:String,
    occasion:String
})
var holidayList = mongoose.model("list", list);
module.exports = holidayList;
