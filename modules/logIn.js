var resource = require('../model/resource');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');

const token_secret = "any$random$auth$token";

function validateToken(req, res, next) {
  
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        res.status(401).send({ message: "Unauthorised." });
    }
    try {  console.log(token)
        const verified = jwt.verify(token, token_secret);
        //req.user = verified;
        next();
    } catch (error) {
        res.status(401).send({ message: "Invalid token.", error:`${error}` });
    }
}

async function login(req, res, next) {
    var { email, password } = req.body;
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
            //save email in localstorage
            localStorage.setItem('email',email);
            // give some permissions
            const token = jwt.sign({
                id: user.id,
                email: user.email,
                permissions: {
                    view: true,
                    update: true,
                }
            }, token_secret, { expiresIn:'3h'});
            res.status(200).header('auth-token', token).send({
                message: "Login sucessful",
                status: "sucess",
                token:token
            });
        }
        else {
            res.status(400).send({ message: "Invalid password." });
        }
    }
    catch (err) {
        res.status(404).send({ message: "No such user.", error: `${err}` });
    }
}

module.exports = { validateToken, login };