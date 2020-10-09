const resource = require('../model/resource');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const contants = require('./constants');

const generateSecret = async () => {
    const randomSecret = await crypto.randomBytes(32).toString('hex');
    process.env.TOKEN_SECRET = randomSecret;
    return randomSecret;
}

//finds all employees involved in a project
const findEmpInProject = async () => {
    const empsAllDetails = await resource.find({
        project: true,
        deleted: false
    });
    const emps = await empsAllDetails.map((value, index) => {
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

    const {
        path
    } = req;
    const pathArr = path.split('/');
    const endPoint = pathArr[pathArr.length - 1];
    if (contants.constant_Data.IGNORE_URL.indexOf(endPoint) > -1) {
        next();
    } else {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send({
                message: "Unauthorised."
            });
        }
        try {
            const verified = jwt.verify(token.split(" ")[1], process.env.TOKEN_SECRET);
            req.user = verified;
            next();
        } catch (error) {
            res.status(401).send({
                message: "Invalid token.",
                error: `${error}`
            });
        }
    }
}



const login = async (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    // null check
    if (email.length === 0) {
        return res.status(400).json({
            message: "Please provide an email."
        });
    }
    if (password.length === 0) {
        return res.status(400).json({
            message: "Please provide a password."
        });
    }
    try {
        const user = await resource.findOne({
            email: email
        });
        const match = user && await bcrypt.compare(password, user.password);

        if (match) {
            // Generate a random secret, this also invalidates previous login token
            await generateSecret();
            // sign JWT token
            const token = jwt.sign({
                id: user.id,
                email: user.email
            }, process.env.TOKEN_SECRET, {
                expiresIn: '90 days'
            });
            //Get employees in a project
            let empsInProject = await findEmpInProject();
            if (empsInProject.length === 0) {
                empsInProject = "Currently no employees in a project.";
            }
            res.status(200).header('authorization', `Bearer ${token}`).send({
                message: "Login sucessful",
                token: token,
                employees: empsInProject
            });
        } else {
            throw Error();
        }
    } catch (err) {
        res.status(404).send({
            message: "Invalid username/password"
        });
    }
}

module.exports = {
    validateToken,
    login
};