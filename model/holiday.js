var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var list = new Schema({
    holidayDate: { type: Date},
    occasion:{type: String}
})
var holidayList = mongoose.model("list", list);
module.exports = holidayList;
