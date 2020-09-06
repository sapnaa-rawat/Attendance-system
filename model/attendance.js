var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var attendance = new Schema({
  name: {
    type: String
  },
  empattendance: {
    type: String,
    required: true,
    enum: ['p', 'PNB', 'PL', 'UPL', 'HD', 'H', 'OH', 'WFH', 'UCL', 'PCL']
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


var attendances = mongoose.model("attendance", attendance);

module.exports = attendances;