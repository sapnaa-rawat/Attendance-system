const resource = require('../model/resource');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const generateSecret = async () => {
    const randomSecret = await crypto.randomBytes(32).toString('hex');
    process.env.TOKEN_SECRET = randomSecret;
    return randomSecret;
}

//finds all employees involved in a project
const findEmpInProject = async () => {
    var empsAllDetails = await resource.find({ project: true, deleted: false });
    var emps = await empsAllDetails.map((value, index) => {
        return {
            name: value.name,
            email: value.email,
            id: value.id,
            technology: value.technology,
            designation: value.designation
        }
    });
    return emps;
}

const validateToken = (req, res, next) => {
    const token = req.header('auth-token') || req.headers.authorization.split(" ")[1];
    if (!token) {
        res.status(401).send({ message: "Unauthorised." });
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        console.log(req.user);
        next();
    } catch (error) {
        res.status(401).send({ message: "Invalid token.", error: `${error}` });
    }
}

const login = async (req, res, next) => {
    var { email, password } = req.body;
    // null check
    if (email.length === 0) {
        res.status(400).send({ message: "Please provide an email." })
    }
    else if (password.length === 0) {
        res.status(400).send({ message: "Please provide a password." })
    }

    else {
        try {
            const user = await resource.findOne({ email: email });
            const hashed_pass = user.password;
            const match = await bcrypt.compare(password, hashed_pass);

            if (match) {
                // Generate a random secret, this also invalidates previous login token
                await generateSecret();
                // sign JWT token
                const token = jwt.sign({
                    id: user.id,
                    email: user.email
                }, process.env.TOKEN_SECRET, { expiresIn: '3h' });
                //Get employees in a project
                var empsInProject = await findEmpInProject();
                if (empsInProject.length === 0) {
                    empsInProject = "Currently no employees in a project.";
                }
                res.status(200).header('auth-token', token).send({
                    message: "Login sucessful",
                    token: token,
                    employees: empsInProject
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
}

module.exports = { validateToken, login };