const express = require('express');
const resourceModel = require('../model/resource');
const holidayModel = require('../model/holiday')


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
    var varifyDate = moment(dateforsearch, 'DD-MMM-YYYY').isAfter('31-jul-2020')

    if (dt.getDay() == 1 && varifyDate == true) {
        next();
    }
    return res.status(422).send({
        msg: 'not a valid date to find attendance of whole week'
    });
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

function weeklyAttendance(req, res, next) {
    let id = req.id;
    let dateforsearch = req.body.date;
    for (let i = 0; i < 5; i++) {
        dataModel.find({
            'id': id,
            'date': dateforsearch
        }).exec(function (error, data) {
            if (error) {
                return res.status(422).send({
                    msg: 'something went wrong'
                })
            }
            console.log(data.date+'>>>>>'+data.attendance);
        })
         dateforsearch = moment(dateforsearch).add(1, 'days');
    }


}

module.exports = {
    weeklyAttendance,
    is_notweekend,
    findIdfromemail,
    is_holiday
}