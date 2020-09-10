const nodemailer = require("nodemailer");
const resources = require("../model/resource");
const constants = require("./constants");
var bcrypt = require('bcrypt');
const saltRounds = 10;



var transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "noreplymailed2020@gmail.com",
    pass: "noReply@12345",
  }
});

async function passhash(password) {
  const hashPass = await bcrypt.hash(password, saltRounds);
  return hashPass;
}

exports.forgot_Password = (req, res) => {
  var email = req.body.email;
  resources.findOne({
    "email": email
  }, async (err, result) => {
    if (err) {
      return res.send(err);
    } else if (result == null) {
      return res.send({
        msg: "No result"
      });
    } else {
      var new_password = Math.random().toString(36).slice(-6);
      var name = result.name;
      const hashPass = await passhash(new_password);
      resources.findByIdAndUpdate(result._id, {
        $set: {
          "password": hashPass
        }
      }, (err, result) => {
        if (err) {
          return res.send(err);
        } else {

          const message = {
            from: constants.constant_Data.SENDER_MAIL_ID, // Sender address
            to: email, // List of recipients
            subject: constants.constant_Data.SUBJECT_RESET_PASSWORD, // Subject line
            html: constants.constant_Data.FORGET_BODY_MAIL.replace("{name}", name).replace("{password}", new_password) // Plain text body
          };
          transporter.sendMail(message, function (err, info) {});
          res.send(200, {
            msg: "password mail send"
          });
        }
      });
    }
  });
};

exports.change_Password = (req, res) => {
  var email = req.body.email;
  var old_password = req.body.old_password;
  if (!(req.body.new_password === req.body.confirm_password)) {
    return res.send({
      msg: "Password not matched"
    });
  } else {
    resources.findOne({
      "email": email
    }, async (err, result) => {
      var name = result.name;
      var hash_password = result.password;
      var new_password = req.body.new_password;
      var Checked_password = await bcrypt.compare(old_password, hash_password);
      if (Checked_password) {
        const hashPass = await passhash(new_password);
        resources.findByIdAndUpdate(result._id, {
          $set: {
            "password": hashPass
          }
        }, (err) => {
          if (err) {
            return res.send(err);
          } else {

            const message = {
              from: constants.constant_Data.SENDER_MAIL_ID, // Sender address
              to: email, // List of recipients
              subject: constants.constant_Data.SUBJECT_CHANGED_PASSWORD, // Subject line
              html: constants.constant_Data.CHANGED_PASSWORD_BODY_MAIL.replace("{name}", name).replace("{password}", new_password) // Plain text body
            };
            transporter.sendMail(message, function (err, info) {});
            res.send(200, {
              msg: "Changed password mail send"
            });
          }
        })
      } else {
        res.status(400).send({
          message: "Invalid password."
        });
      }
    });
  }
}
