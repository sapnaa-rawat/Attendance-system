var moment = require("moment")
var empattendance=require("../model/attendance")
var resource=require("../model/resource");

var arr=['03-aug-2020','02-oct-2020','13-nov-2020','30-nov-2020','25-dec-2020'];
function validation(req, res, next) {
    var date = req.body;
    var day = Object.values(date);
   var exitsdate = moment(day, 'DD-MMM-YYYY').isAfter('31-jul-2020')
  if (exitsdate === true) {
        next();
    }
    else {
        res.status(404).json({ message: `no data for ${day}` })
    }
}

async function attendance(req, res,next) {
    var date = req.body;
    var day = Object.values(date);
    var now = moment(day, 'DD-MMM-YYYY');
     
    if (now.isValid()) {
        var week = now.day();
        if (week == 0 || week == 6) {
            res.status(200).json({ message: "no data for saturday and sunday" })
        
        }
        else {
         
var result=await empattendance.findOne({"date":day,"empid":req.body.empid});
console.log(result)
console.log(req.body.empid)
if(result===null){
    res.status(404).json({message:"attendance not filled"});
}
res.status(200).json({"empname":result.name,"date":result.date,"status":result.empattendance})
    }
    }
    else {
        res.status(404).json({ message: "invalid Date" })
    }
}

function holiday(req,res,next){
    var date = req.body;
    var day = Object.values(date);
   for(var i=0;i<=9;i++){
        if(arr[i]==day){
            console.log(arr[i])
        res.status(200).json({message:"mandatory holiday"})
        
    }}
    next();
}

module.exports = {
    holiday,
    validation,
    attendance
   
}