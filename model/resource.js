var mongoose = require("mongoose");
var Schema = mongoose.Schema;
autoIncrement = require("mongoose-auto-increment");
var connection = mongoose.createConnection("mongodb://localhost/test");
autoIncrement.initialize(connection);

var resource = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  phoneNumber: { type: Number, required: true },
  skype: { type: String, required: true },
  designation: { type: String, required: true },
  technology: { type: String, required: true },
  id: { type: Number },
  deleted: false,
  createdOn: { type: Date, default: Date.now },
  modifiedOn: { type: Date, default: Date.now },
  password : String,
  project : false,
});

resource.plugin(autoIncrement.plugin, {
  model: "resource",
  field: "id",
  startAt: 1,
});
var resources = mongoose.model("resource", resource);
module.exports = resources;
