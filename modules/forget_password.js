const nodemailer = require("nodemailer");




var transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp-relay.gmail.com",
    port: 465,
    auth: {
      user: "",
      pass: "",
    },
    secure: true,
  });


exports.forgot_Password = (req, res) => {
    var email = req.body.email;

    con.query(sql, email, (err, result) => {
      if (err || result.length == 0) {
        response.onError(res, Constants.Strings.Forget_mail, 402, err || "No result");
      } else {
        var password = Math.random().toString(36).slice(-6);
        var name = result[0].first_name;

        let sql = "update user set password=? where email=? ";
        con.query(sql, [md5(password), email], (err, result) => {
          if (err) {
            response.onError(res, Constants.Strings.ERROR, 402, err);
          } else {
            const message = {
              from: , // Sender address
              to: email, // List of recipients
              subject: "Reset password", // Subject line
              html: `Hi {name},<br><br> Here is the new password- <b>{password}</b><br><br> If password reset wasn’t intended: If you didn't make the request, just ignore this email.<br><br>For security, this password expires after a day.<br><br> Thanks <br><br>`, // Plain text body
            };
            transporter.sendMail(message, function (err, info) {
            });

          }
        });
      }
    });
  };