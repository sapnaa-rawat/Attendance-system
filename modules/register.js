var model = require('../model/resource');
var {body,validationResult,sanitize} = require('express-validator');

function register(req, res, next) {
    var { name, email, phone, skype, designation, technology, id, password } = req.body;
    res.status(200).send({
        name: name,
        email: email,
        phone: phone,
        skype: skype,
        designation: designation,
        technology: technology,
        id: id,
        password: password
    });
}

function registerPage(req, res, next) {
    // res.sendFile(path.join(process.cwd(),'views',"register.html"));
    res.render('register');
}

module.exports = { register, registerPage };