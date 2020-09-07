const express = require('express');
const moment = require('moment-timezone')
const resourceModel = require('../model/resource');
const attendanceModel = require('../model/attendance');
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');


function findIdfromemail(req, res, next) {
    let email=localStorage.getItem('email');
    console.log(email);

    resourceModel.findOne({
        "email": email
    }).exec(function (error, response) {
        if (error) return res.status(422).send("something went wrong")
        if (response)
            req.id = response.id;
        next()
    })
}

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
    let id = req.id;
    let dateforsearch = req.body.date//moment(req.body.date).tz("Asia/Kolkata").format("DD-MMM-YYYY");
    let temp = [];
    let userdata = [];
    console.log(dateforsearch);
    if(dateforsearch==moment().format('DD-MMM-YYYY')){
    attendanceModel.findOne({
        'empid': req.body.id,
        'date': dateforsearch
        }).exec(function(error,data){
            if(error){
                return res.status(422).send("something went wrong");
            }
            
            console.log(data);
            return res.status(200).send(`your attendance on ${data.date} is ${data.empattendance}`)
        })
        
        
    }
    
    for (let i = 0; i < 5; i++) {
        dbdata = await attendanceModel.findOne({
            'empid': req.body.id,
            'date': dateforsearch
        });
        temp.push(dbdata);
        dateforsearch = moment(dateforsearch).add(1, 'days').format('DD-MMM-YYYY')

    }
    
    
    for (let iterator = 0; iterator < temp.length; iterator++) {
        if(temp[iterator]!=null){
            userdata.push(temp[iterator]);
        }
        
    }
    
    let tempdata = userdata.map(function (value, index, arr) {
        return `your attendance on ${moment(userdata[index].date).tz("Asia/Kolkata").format("DD-MMM-YYYY")} is ${userdata[index].empattendance}`;
    })
   
    return res.status(200).send(tempdata);
}

module.exports = {
    weeklyAttendance,
    is_notweekend,
    findIdfromemail,
    //is_holiday
}