var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var leavesSchema = new Schema({
    empid: { type: Number, required: true },
    type: { type: String, match: /CL|EL|SL|ML/i, uppercase: true, default: 'CL' },
    appliedOn: { type: Date, required: true, default: Date.now },
});

// a static method for getting all employees by empid
leavesSchema.statics.findAllLeavesById = async function (id) {
    return await this.find({ empid: id });
}

var leaves = mongoose.model('leaves', leavesSchema);

module.exports = leaves;