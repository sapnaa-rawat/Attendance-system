const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const attendance = new Schema({
  name: {
    type: String
  },
  empattendance: {
    type: String,
    required: true,
    enum: ['P', 'PNB', 'PL', 'UPL', 'HD', 'H', 'OH', 'WFH', 'UCL', 'PCL']
  },
  empid: {
    type: Number,
    require: true
  },
  date: {
    type: String,
    require: true
  },
  project :{type:Boolean}
});


const attendances = mongoose.model("attendance", attendance);

module.exports = attendances;
