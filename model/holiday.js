const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const list = new Schema({
    holidayDate:[String]
})
const holidayList = mongoose.model("list", list);
module.exports = holidayList;
