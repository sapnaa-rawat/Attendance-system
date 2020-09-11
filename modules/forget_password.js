const nodemailer = require("nodemailer");
const resources = require("../model/resource");
const bcrypt = require('bcrypt');
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

var passhash = async (password) => {
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

          var constant_message = {
            Forget_body_mail: "Hi {name},<br><br> Here is the new password- <b>{password}</b><br><br>If password reset wasn’t intended: If you didn't make the request, just ignore this email.<br><br>Thanks <br><br>"
          }

          const message = {
            from: "noreplymailed2020@gmail.com", // Sender address
            to: email, // List of recipients
            subject: "Reset password", // Subject line
            html: constant_message.Forget_body_mail.replace("{name}", name).replace("{password}", new_password) // Plain text body
          };
          transporter.sendMail(message, function (err, info) { });
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

            var constant_message = {
              Changed_password_body_mail: "Hi {name},<br><br> Here is the updated password- <b>{password}</b><br><br>Thanks <br><br>"
            }

            const message = {
              from: "noreplymailed2020@gmail.com", // Sender address
              to: email, // List of recipients
              subject: "Password Changed", // Subject line
              html: constant_message.Changed_password_body_mail.replace("{name}", name).replace("{password}", new_password) // Plain text body
            };
            transporter.sendMail(message, function (err, info) { });
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
