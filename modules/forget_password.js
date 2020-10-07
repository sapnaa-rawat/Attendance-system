const nodemailer = require("nodemailer");
const resources = require("../model/resource");
const constants = require("./constants");
const bcrypt = require('bcrypt');


const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: "noreplymailed2020@gmail.com",
        pass: "noReply@12345",
    },
    secure: false,
    requireTLS: true,
});

/**
 * @description Hashing password
 * @summary convert the password into hash
 * @param {password}
 * @returns hashed password
 */
const passhash = async (password) => {
    const hashPass = await bcrypt.hash(password, constants.constant_Data.SALTROUNDS);
    return hashPass;
}

/**
 * @description Forgot password
 * @summary create a random generated password and send mail to user
 * @param {email} email
 * @returns sends a mail to the user with it's passwords
 */
exports.forgot_Password = (req, res) => {
    const {email} = req.body;
    resources.findOne({
        email
    }, async (err, result) => {
        if (err) {
            return res.send(400, {"msg": err});
        } else if (result == null) {
            return res.send(404, {
                msg: "No result"
            });
        } else {
            const new_password = Math.random().toString(36).slice(-6);
            const {name} = result;
            const hashPass = await passhash(new_password); //hashing password
            resources.findByIdAndUpdate(result._id, {
                $set: {
                    "password": hashPass
                }
            }, (err, result) => {
                if (err) {
                    return res.send(400, {"msg": err});
                } else {

                    const message = {
                        from: constants.constant_Data.SENDER_MAIL_ID, // Sender address
                        to: email, // List of recipients
                        subject: constants.constant_Data.SUBJECT_RESET_PASSWORD, // Subject line
                        html: constants.constant_Data.FORGET_BODY_MAIL(name, new_password) // Plain text body
                    };
                    transporter.sendMail(message, function (err, info) {
                    }); //sending mail
                    res.send(200, {
                        msg: "password mail send"
                    });
                }
            });
        }
    });
};

/**
 * @description Change Password
 * @summary change old password with new password and send mail to user
 * @param {email, old_password, new_password, confirm_password}
 * @returns sends a mail to the user with it's passwords
 */
exports.change_Password = (req, res) => {
    const {email, old_password} = req.body;
    if (!(req.body.new_password === req.body.confirm_password)) {
        return res.send(401, {
            msg: "Password not matched"
        });
    } else {
        resources.findOne({
            email
        }, async (err, result) => {
            const {name} = result;
            const hash_password = result.password;
            const new_password = req.body.new_password;
            const Checked_password = await bcrypt.compare(old_password, hash_password);
            if (Checked_password) {
                const hashPass = await passhash(new_password);
                resources.findByIdAndUpdate(result._id, {
                    $set: {
                        "password": hashPass
                    }
                }, (err) => {
                    if (err) {
                        return res.send(400, {"msg": err});
                    } else {
                        const message = {
                            from: constants.constant_Data.SENDER_MAIL_ID, // Sender address
                            to: email, // List of recipients
                            subject: constants.constant_Data.SUBJECT_CHANGED_PASSWORD, // Subject line
                            html: constants.constant_Data.CHANGED_PASSWORD_BODY_MAIL(name, new_password) // Plain text body
                        };
                        transporter.sendMail(message, function (err, info) {
                        });
                        res.send(200, {
                            msg: "Changed password mail send"
                        });
                    }
                })
            } else {
                res.status(401).send({
                    message: "Invalid password."
                });
            }
        });
    }
}
