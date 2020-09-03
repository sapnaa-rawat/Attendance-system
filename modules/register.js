var path = require('path');

function register(req, res, next) {
    var { name, email, password } = req.body;
    res.status(200).send({
        name: name,
        email: email,
        password: password
    });
}

function registerPage(req, res, next) {
    res.sendFile(path.join(process.cwd(),'views',"register.html"));
}

module.exports = {register, registerPage};