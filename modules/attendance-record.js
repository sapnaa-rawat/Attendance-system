var attendance = require('../model/attendance')
// var Employee = require('../model/resource');
var moment = require('moment');
const {
  Date
} = require('mongoose');
const resources = require('../model/resource');
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');


const authenticateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token)
    const decodedToken = jwt.verify(token, "any$random$auth$token");

    console.log(decodedToken)
    req.user = {
      email: decodedToken.email
    };
    console.log(user)
    next();
  } catch (err) {
    res.status(401).json({
      message: "Auth failed!"
    });
  }

}

function findIdfromemail(req, res, next) {
  //let email = req.user.email;
  let email = localStorage.getItem('email');
  console.log(email)
  resources .findOne({
    "email": email
  }).exec(function (error, response) {
    if (error) return res.status(422).send("something went wrong")
    if (response)
      req.id = response.id;

    req.project = response.project;
    next()
  })
}

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
          if (result.length==0){
            
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




function is_weekend(req, res, next) {
  let dateforsearch = req.body.date;
  var dt = new Date(dateforsearch);
  var verifyDate = moment(dateforsearch, 'DD-MMM-YYYY').isAfter('31-jul-2020')

  if (dt.getDay() == 0 && dt.getDay() == 6 && verifyDate == true) {
    return res.send(holiday);
  }
  return res.status(422).send({
    msg: 'not a valid date to find attendance of whole week'
  });
}

module.exports = {
  markAttendance,
  authenticateToken,
  findIdfromemail,
  is_weekend
}