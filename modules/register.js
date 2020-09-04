var model = require('../model/resource');
var moment = require('moment');
var validator = require("email-validator");

function validate(req, res, next) {
    var { name, email, phone, skype, designation, technology, id, password, project } = req.body;
    try {
        if(!name){
            throw new Error("Name not provided.");
        }
        if(!email){
            throw new Error("Email not provided.");
        }
        if(!phone){
            throw new Error("Phone not provided.");
        }
        if(!skype){
            throw new Error("Skype not provided.");
        }
        if(!designation){
            throw new Error("Designation not provided.");
        }
        if(!technology){
            throw new Error("Technology not provided.");
        }
        if(!id){
            throw new Error("Id not provided.");
        }
        if(!password){
            throw new Error("Password not provided.");
        }
        else{
            var emailValid = validator.validate(email);
            if(!emailValid){
                throw new Error("Invalid email.");
            }
            next();
        }
        
    } 
    catch (error) {
        res.status(400).send({message:"Invalid details", error:error});
    }
}

async function resourceExists(req, res, next) {
    const {email} = req.body.email;
    try {
        var existing = await model.find({email:email});
    if (existing.length > 0) {
        res.status(409).send({ message: "Resource already exists.",
         resource:{
             id:existing[0].id,
             email:existing[0].email
            } 
        });
    }
    else {
        next();
    }
    } 
    catch (error) {
        res.status(500).send({message:"Error reading from database."});
    }
}

function register(req, res, next) {
    var { name, email, phone, skype, designation, technology, id, password } = req.body;
}


module.exports = { register, validate, resourceExists };