var resource = require('../model/resource');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');

const token_secret = "any$random$auth$token";

function validateToken(req, res, next) {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ message: "Unauthorised." });
    }
    try {
        const verified = jwt.verify(token, token_secret);
        //req.user = verified;
        next();
    } catch (error) {
        res.status(401).send({ message: "Invalid token." });
    }
}

async function login(req, res, next) {
    var { email, password } = req.body;
    localStorage.setItem('email',email);
    // null check
    if (email.length === 0) {
        res.status(400).send({ message: "Please provide an email." })
    }
    if (password.length === 0) {
        res.status(400).send({ message: "Please provide a password." })
    }

    try {
        const user = await resource.findOne({ email: email });
        const hashed_pass = user.password;
        const match = await bcrypt.compare(password, hashed_pass);

        if (match) {
            // give some permissions
            const token = jwt.sign({
                id: user.id,
                email: user.email,
                permissions: {
                    view: true,
                    update: true,
                }
            }, token_secret);
            res.status(200).header('auth-token', token).send({
                message: "Login sucessful",
                status: "sucess"
            });
        }
        else {
            res.status(400).send({ message: "Invalid password." });
        }
    }
    catch (error) {
        res.status(404).send({ error: err, message: "No such user." });
    }
}

module.exports = { validateToken, login };