var resource = require('../model/resource');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var LocalStorage = require('node-localstorage').LocalStorage;
var localStorage = new LocalStorage('./scratch');
var crypto = require('crypto');

async function generateSecret(){
    const randomSecret = await crypto.randomBytes(32).toString('hex');
    process.env.TOKEN_SECRET = randomSecret;
    return randomSecret;
}

function validateToken(req, res, next) {
    const token = req.header('auth-token') || req.headers.authorization.split(" ")[1];
    if (!token) {
        res.status(401).send({ message: "Unauthorised." });
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).send({ message: "Invalid token.", error: `${error}` });
    }
}

async function login(req, res, next) {
    var { email, password } = req.body;
    // null check
    if (email.length === 0) {
        res.status(400).render('login', { message: "", error: "Email cannot be empty!" });
    }
    if (password.length === 0) {
        res.status(400).render('login', { message: "", error: "No password!" });
    }

    try {
        const user = await resource.findOne({ email: email });
        const hashed_pass = user.password;
        const match = await bcrypt.compare(password, hashed_pass);

        if (match) {
            //save email in localstorage
            localStorage.setItem('email',email);
            // Generate a random secret, this also invalidates previous login token
            await generateSecret();
            // give some permissions
            const token = jwt.sign({
                id: user.id,
                email: user.email
            }, process.env.TOKEN_SECRET, { expiresIn:'3h'});
            res.status(200).header('auth-token', token).send({
                message: "Login sucessful",
                error: ""
            });
        }
        else {
            res.status(400).render('login', { message: "", error: "Invalid password." });
        }
    }
    catch (err) {
        res.status(404).render('login', { message: "", error: "No such user." });
    }
}

function loginPage(req, res) {
    res.render('login', { message: "", error: "" });
}

module.exports = { validateToken, login, loginPage };