const express = require('express');
const dataModel = require('../model/datamodel');



function findIdfromemail(req, res, next) {
    let email = req.user.email;

    empdata.findOne({
        "email": email
    }).exec(function (error, response) {
        if (error) return res.status(422).send("something went wrong")
        if (response)
            req.id = response.id;
        next()
    })
}

function is_notweekend(req,res,next) {
    let dateforsearch = req.body.date;
    var dt = new Date(dateforsearch);
    var varifyDate = moment(dateforsearch, 'DD-MMM-YYYY').isAfter('31-jul-2020')

    if (dt.getDay() == 1 && varifyDate==true) {
        next();
    }
    return res.status(422).send({msg:'not a valid date to find attendance of whole week'});
}

function is_holiday(req,res,next){
    let dateforsearch = req.body.date;
    
}

function weeklyAttendance(req, res, next) {
    let id = req.id;
    let dateforsearch = req.body.date;
    dataModel.find({
        'id': id,
        'date':dateforsearch
    }).exec(function(error,data){
        if(error){
            return res.status(422).send({msg:'something went wrong'})
        }
        var datefromdb=data.date;
    })

    

    
}

module.exports = {
    weeklyAttendance,
    is_notweekend,
    findIdfromemail
}