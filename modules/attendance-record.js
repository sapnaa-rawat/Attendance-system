const attendance = require('../model/attendance')
var moment = require('moment');
const resources = require('../model/resource');


function markAttendance(req, res) {
  let body = req.body;
  let empattendance_data = body.map((item) => {
    return item.empid;
  })
 
  resources.find({
    "id": empattendance_data,
    "project": true
  }, (err, result) => {
    if (err) {
      return err
    } else {
      
      result.map((data)=>{
        console.log(data);
        body.map((item) => {
          if(data.id == item.empid){
            console.log(item);
          attendance.find({"empid" : data.id, "date" : item.date}, (err,result) => {
          if(err) {return err}
          console.log(result)
          if ((result.length==0)|| (moment(item.date, 'DD-MMM-YYYY',true).isValid())){
            
            let attendancedata = new attendance({
                     date: item.date,
                     empattendance: item.empattendance,
              
                     empid:data.id,
                 project:data.project
              
                });
              
                   attendancedata
                   .save((err) => {
                    if (err) {
                        return res.send(404, {
                            message: "Not Found"
                        })
                      }
                      })
                   }
                   else {
                    attendance.findOneAndUpdate({"empid" : data.id, "date" : item.date}, {"empid" : data.id, "date" : item.date, $set : {"empattendance" : item.empattendance}, "project" : data.project}, (err) => {
                      if(err) {return err}
                      })
                   }
          })
          }
        })
      })
     res.send({msg : "updated"});
    }
  })
}



/*
function is_weekend(req, res, next) {
  let dateforsearch = req.body.date;    
  var dt = new Date(dateforsearch);
  var verifyDate = moment(dateforsearch, 'DD-MMM-YYYY').isAfter('31-jul-2020')
  console.log(verifyDate,"heyyy")


  if ( dt.getDay() == 0 && dt.getDay() == 6 && verifyDate ==true) {
    console.log(dt)
    return res.send("holiday");
  }
  else {
    
        next()
 
}

}*/

module.exports = {
  markAttendance,
 
  //is_weekend
}


