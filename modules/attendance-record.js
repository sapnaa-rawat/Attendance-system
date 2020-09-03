var attendance =require('../model/attendance')
var Employee = require('../model/resource');
var moment=require('moment');





const authenticateToken = (req, res, next) => {
    
  try {
      
       const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, "req.session.privatekey");
      req.user = {
          email: decodedToken.email
      };

      next();
  } catch (err) {
      res.status(401).json({
          message: "Auth failed!"
      });
  }

}

function findIdfromemail(req, res, next) {
  let email = req.user.email;

  resourceModel.findOne({
      "email": email
  }).exec(function (error, response) {
      if (error) return res.status(422).send("something went wrong")
      if (response)
          req.id = response.id;
      next()
  })
}







function markAttendance(req, res, next) {
console.log(req.body);
let Date=req.body.date;
  Date = moment(req.body.date).format("DD-MMM-YYYY");
  
  console.log(Date);
  //let empId=req.id;
    let empId= req.body.empid;
  let empAttendance = req.body.empattendance;
  let attendancedata = new attendance({
    date: Date,
    empattendance: empAttendance,
    empid:empId
  });
  attendancedata
    .save()
    .then((doc) => {
      res.status(200).json({
        message: "attendance marked successfully",
        results: doc,
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "not marked" });
    });
}


/*

function updateAttendance(req, res, next) {

  let employerDetails = req.body;
  let email = req.user.email;
  attendance.updateOne({
      "email": email
  }, {
      $set: employerDetails
  }, function (error, data) {
      if (error) {
          return res.status(500).send({
              message: error
          });
      }
      return res.status(200).send(`user updated on id:${email}`);
  });
}
*/

module.exports={
  markAttendance,
  authenticateToken,
  findIdfromemail
}




/*
var Employee = require('../model/resource');


router.get('/', function(req, res){
     Employee.getEmployees(function(err,employees){
         if(err) throw err;
         res.json(employees);
     });
 })
 
router.post('/', function(req, res){
    var newEmployee = {
        name: req.body.name,
        position : req.body.position,
        department : req.body.department,
        salary: req.body.salary
    }
     Employee.addEmployee(newEmployee,function(err,employee){
         if(err) throw err;
         res.json(employee);
     });
 })

 router.put('/:_id', function(req, res){
     var update = {
        name: req.body.name,
        position : req.body.position,
        department : req.body.department,
        salary: req.body.salary
    }
     Employee.updateEmployee(req.params._id , update, function(err,employee){
         if(err) throw err;
         res.json(employee);
     });
 })
 router.delete('/:_id', function(req, res){
     
     Employee.deleteEmployee(req.params._id ,  function(err,employee){
         if(err) throw err;
         res.json(employee);
     });
 })
 router.get('/:_id', function(req, res){
    
     Employee.getEmployee(req.params._id , function(err,employee){
         if(err) throw err;
         res.json(employee);
     });
 })
module.exports = router*/