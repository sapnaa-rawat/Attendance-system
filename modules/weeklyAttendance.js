const express = require('express');
const moment = require('moment')
const resourceModel = require('../model/resource');
const holidayModel = require('../model/holiday')
const attendanceModel = require('../model/attendance');


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

function is_notweekend(req, res, next) {
    let dateforsearch = req.body.date;
    var dt = new Date(dateforsearch);
    /* var dt=new Date(dateforsearch).toLocaleString('en-US', {
        timeZone: 'Asia/Calcutta'
      }); */
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

/* function is_holiday(req, res, next) {
    let dateforsearch = req.body.date;

    holidayModel.find({
        'holidayDate': dateforsearch
    }).exec(function (error, data) {
        if (error) {
            return res.status(422).send("something went wrong");
        }
        if (data) {
            return res.status(200).send({
                msg: data.occasion
            })
        }
        next()
    })
} */

async function weeklyAttendance(req, res, next) {
    let id = req.body.id;
    let dateforsearch = moment(req.body.date).tz("Asia/Kolkata").format("DD-MMM-YYYY");

    console.log(">>>>>",id, dateforsearch);

    res.send("ok");

    // let temp = [];
    // let userdata = [];

    // for (let i = 0; i < 6; i++) {
    //     dbdata = await attendanceModel.findOne({
    //         'empid': id,
    //         'date': new Date(dateforsearch)
    //     });
    //     temp.push(dbdata);
    //     dateforsearch = moment(dateforsearch).add(1, 'days').format('DD-MMM-YYYY')

    // }
    //console.log(temp)


    // for (let iterator = 1; iterator < temp.length; iterator++) {
    //     userdata.push(temp[iterator]);
    // }
    // console.log(userdata);

    // let tempdata = userdata.map(function (value, index, arr) {
    //     return `your attendance on ${moment(userdata[index].date).tz("Asia/Kolkata").format("DD-MMM-YYYY")} is ${userdata[index].empattendance}`;
    // })
    // console.log(tempdata);
    // return res.status(200).send(tempdata);
}

module.exports = {
    weeklyAttendance,
    is_notweekend,
    findIdfromemail,
    //is_holiday
}