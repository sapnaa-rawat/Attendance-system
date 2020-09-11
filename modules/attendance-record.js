const moment = require('moment');
const resources = require('../model/resource');
const attendances = require('../model/attendance');


const check_Weekend = (req, res, next) => {
  let body = req.body;
  body.forEach((item) => {
    var verifyDate = moment(item.date, 'DD-MMM-YYYY').isAfter('31-jul-2020')
    var date = new Date(item.date);
    console.log(date.getDay(), verifyDate);
    if (date.getDay() == 0 || date.getDay() == 6 || (!(verifyDate))){
      return res.send({"msg": `holiday on this ${item.date} `})
    }
  })
  next();
}

const markAttendance = async (req, res) => {
  let body = req.body;
  const empattendance_data = body.map((item) => item.empid);
  const resource_data = await resources.find({"id" : empattendance_data, "project" : true, "deleted" : false}).catch((err) => console.log(err));
  const resource_id = resource_data.map((item) => item.id);
  body.map((item) => {
    if(resource_id.includes(item.empid)){
      attendances.findOneAndUpdate({"empid": item.empid, "date" : item.date}, {$set : {"empattendance" : item.empattendance, "project" : true}}, {upsert : true}, (err) => {
        if(err) {return res.send(err);}
      })
    }
  })
  res.send("ok");
}


module.exports = {
  markAttendance,
  check_Weekend
}
