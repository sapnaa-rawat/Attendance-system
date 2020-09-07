const nodemailer = require("nodemailer");
const resources = require("../model/resource");



var transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp-relay.gmail.com",
    port: 465,
    auth: {
      user: "noreplymailed2020@gmail.com",
      pass: "",
    },
    secure: true,
  });


exports.forgot_Password = (req, res) => {
    var email = req.body.email;
console.log(email)
    resources.findOne(email, (err, result) => {
      if (err) {
          return res.send(402, err);
      } else if(result.length == 0){
        return res.send(402, {msg : "No result"});
      }
      else {
        var password = Math.random().toString(36).slice(-6);
        var name = result.name;

        resources.findByIdAndUpdate(result.id, {$set : {"password" : password}}, (err, result) => {
          if (err) {
            return res.send(402, err);
        } else {
            const message = {
              from: "noreplymailed2020@gmail.com", // Sender address
              to: email, // List of recipients
              subject: "Reset password", // Subject line
              html: `Hi {name},<br><br> 
                    Here is the new password- <b>{password}</b><br><br> 
                    If password reset wasn’t intended: If you didn't make the request,
                    just ignore this email.<br><br>
                    Thanks <br><br>`, // Plain text body
            };
            transporter.sendMail(message, function (err, info) {
            });
            res.send(200, {msg : "password mail send"});
          }
        });
      }
    });
  };
