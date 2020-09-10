const express = require('express');
const moment = require('moment-timezone')
const attendanceModel = require('../model/attendance');

function is_notweekend(req, res, next) {
    let dateforsearch = req.body.date;
    var dt = new Date(dateforsearch);
    console.log(dt);
    console.log(dt.getDay());
    var varifyDate = moment(dateforsearch, 'DD-MMM-YYYY').isAfter('31-jul-2020')

    if (dt.getDay() == 1 && varifyDate == true) {
        next();
    } else {
        return res.status(422).send({
            msg: 'not a valid date to find attendance of whole week'
        });
    }

}

async function weeklyAttendance(req, res, next) {
    //let id = req.id;
    let body=req.body;
    console.log(body)
    let id = req.body.id;
    let dateforsearch = req.body.date//moment(req.body.date).tz("Asia/Kolkata").format("DD-MMM-YYYY");
    if(dateforsearch==moment().format('DD-MMM-YYYY')){
    attendanceModel.findOne({
        'empid': id,
        'date': dateforsearch,
        'project':true
        }).exec(function(error,data){
            if(error){
                return res.status(422).send("something went wrong");
            }
            
            console.log(data);
            return res.status(200).send(`your attendance on ${data.date} is ${data.empattendance}`)
        })
        
        
    }
    // ******** Getting rid of loop ******** //
    // end date is non inclusive (because of using $lt and not $lte), so add 6 instead of 5
    const enddate = moment(dateforsearch).add(6, 'days').format('DD-MMM-YYYY');
    
        var userdata = await attendanceModel.find({
            'empid': id,
            'date': { $gte:dateforsearch, $lt:enddate},
            'project':true
        }).sort({date:1});
    
    if(userdata.length===0){
        return res.status(200).json({message:"attendance not marked for this week"});
    }
    // presenting the date in a nice way
    let result = userdata.map( docval => {
        return {"date":moment(docval.date).format("DD-MMM-YYYY"), "attendance": docval.empattendance}
    });
    return res.status(200).send(result);
}

module.exports = {
    weeklyAttendance,
    is_notweekend
    //is_holiday
}