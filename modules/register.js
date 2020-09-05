var model = require('../model/resource');
var moment = require('moment');
var validator = require("email-validator");
var bcrypt = require('bcrypt');

const saltRounds = 10;

function validate(req, res, next) {
    var { name, email, phoneNumber, skype, designation, technology, id, password, project } = req.body;
    try {
        if (!name) {
            throw new Error("Name not provided.");
        }
        if (!email) {
            throw new Error("Email not provided.");
        }
        if (!phoneNumber) {
            throw new Error("Phone number not provided.");
        }
        if (!skype) {
            throw new Error("Skype not provided.");
        }
        if (!designation) {
            throw new Error("Designation not provided.");
        }
        if (!technology) {
            throw new Error("Technology not provided.");
        }
        if (!password) {
            throw new Error("Password not provided.");
        }
        else {
            var emailValid = validator.validate(email);
            if (!emailValid) {
                throw new Error("Invalid email.");
            }
            next();
        }

    }
    catch (error) {
        res.status(400).render({ message: "Invalid details", extra: `${error}` });
    }
}

async function resourceExists(req, res, next) {
    const email = req.body.email;
    try {
        var existing = await model.find({ email: email });
        if (existing.length > 0) {
            // console.log(existing);
            res.status(409).render('register', {
                message: `Resource already exists.`,
                extra: `email = ${existing[0].email}\n\n
        id = ${existing[0].id}`
            });
        }
        else {
            next();
        }
    }
    catch (error) {
        res.status(500).render({ message: "Error reading from database.", extra:"" });
    }
}

async function register(req, res, next) {
    var { name, email, phoneNumber, skype, designation, technology, id, password, project } = req.body;
    try {
        //hash the password
        const hashPass = await bcrypt.hash(password, saltRounds);
        //get the date in the required format
        // const date = moment(new Date).format("DD-MMM-YYYY");
        const date = new Date();
        //sanity check for project
        var project = project === true;
        //Create record
        let newResource = new model({
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            skype: skype,
            designation: designation,
            technology: technology,
            id: id,
            password: hashPass,
            project: project,
            deleted: false,
            createdOn: date,
            modifiedOn: date
        });
        newResource.save()
            .then(doc => res.status(201).render('register', { message: "User created sucessfully." }))
            .catch(err => res.status(500).render('register', { message: "Err! User creation failed.", error: err }));

    } catch (error) {
        res.status(500).render({ message: "Password hash failed.", extra: `${error}` });
    }
}

function registerPage(req, res, next) {
    // res.sendFile(path.join(process.cwd(),'views',"register.html"));
    res.render('register', { message: 'The results will be displayed here.', extra:"" });
}

module.exports = { register, validate, resourceExists, registerPage };
