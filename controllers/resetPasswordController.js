require("dotenv").config();
var Users = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var crypto = require("crypto");
var nodemailer = require("nodemailer");
var depoloymentURL = "https://iti-amazon-mearn.netlify.app/"; // to be changed **
var testSalt;

module.exports = function (app) {
  app.get("/resetpassword/sendEmail/:id", async (req, res) => {
    try {
      console.log(req);
      var token;
      crypto.randomBytes(20, function (err, buf) {
        token = buf.toString("hex");
      });
      const salt = (testSalt = await bcrypt.genSalt());

      const hashedResetPasswordToken = await bcrypt.hash(token, salt);

      if (req.params.id) {
        console.log("test at if");
        Users.findByIdAndUpdate(
          req.params.id,
          {
            // _id: req.body.id,

            resetPasswordToken: hashedResetPasswordToken,
            resetPasswordExpires: Date.now() + 3600000,
          },
          function (err, USER) {
            if (err) throw err;

            user = USER;
            // console.log(JSON.stringify(USER));
          }
        );
      }

      //Email Html Body
      var tempHTMl = `<head>
<title>Rating Reminder</title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<meta content="width=device-width" name="viewport">
<style type="text/css">
            @font-face {
              font-family: &#x27;Postmates Std&#x27;;
              font-weight: 600;
              font-style: normal;
              src: local(&#x27;Postmates Std Bold&#x27;), url(https://s3-us-west-1.amazonaws.com/buyer-static.postmates.com/assets/email/postmates-std-bold.woff) format(&#x27;woff&#x27;);
            }

            @font-face {
              font-family: &#x27;Postmates Std&#x27;;
              font-weight: 500;
              font-style: normal;
              src: local(&#x27;Postmates Std Medium&#x27;), url(https://s3-us-west-1.amazonaws.com/buyer-static.postmates.com/assets/email/postmates-std-medium.woff) format(&#x27;woff&#x27;);
            }

            @font-face {
              font-family: &#x27;Postmates Std&#x27;;
              font-weight: 400;
              font-style: normal;
              src: local(&#x27;Postmates Std Regular&#x27;), url(https://s3-us-west-1.amazonaws.com/buyer-static.postmates.com/assets/email/postmates-std-regular.woff) format(&#x27;woff&#x27;);
            }
        </style>
<style media="screen and (max-width: 680px)">
            @media screen and (max-width: 680px) {
                .page-center {
                  padding-left: 0 !important;
                  padding-right: 0 !important;
                }
                
                .footer-center {
                  padding-left: 20px !important;
                  padding-right: 20px !important;
                }
            }
        </style>
</head>
<body style="background-color: #f4f4f5;">
<table cellpadding="0" cellspacing="0" style="width: 100%; height: 100%; background-color: #f4f4f5; text-align: center;">
<tbody><tr>
<td style="text-align: center;">
<table align="center" cellpadding="0" cellspacing="0" id="body" style="background-color: #fff; width: 100%; max-width: 680px; height: 100%;">
<tbody><tr>
<td>
<table align="center" cellpadding="0" cellspacing="0" class="page-center" style="text-align: left; padding-bottom: 88px; width: 100%; padding-left: 120px; padding-right: 120px;">
<tbody><tr>
<td style="padding-top: 24px;">
<img src="https://logodownload.org/wp-content/uploads/2014/04/amazon-logo-10.png" style="width: 150px;">
</td>
</tr>
<tr>
<td colspan="2" style="padding-top: 72px; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #000000; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 48px; font-smoothing: always; font-style: normal; font-weight: 600; letter-spacing: -2.6px; line-height: 52px; mso-line-height-rule: exactly; text-decoration: none;">Reset your password</td>
</tr>
<tr>
<td style="padding-top: 48px; padding-bottom: 48px;">
<table cellpadding="0" cellspacing="0" style="width: 100%">
<tbody><tr>
<td style="width: 100%; height: 1px; max-height: 1px; background-color: #d9dbe0; opacity: 0.81"></td>
</tr>
</tbody></table>
</td>
</tr>
<tr>
<td style="-ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #9095a2; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 16px; font-smoothing: always; font-style: normal; font-weight: 400; letter-spacing: -0.18px; line-height: 24px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 100%;">
                                      You're receiving this e-mail because you requested a password reset for your Amazon account. Please note that the following link is valid for one hour.
                                    </td>
</tr>
<tr>
<td style="padding-top: 24px; -ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #9095a2; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 16px; font-smoothing: always; font-style: normal; font-weight: 400; letter-spacing: -0.18px; line-height: 24px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 100%;">
                                      Please tap the button below to choose a new password.
                                    </td>
</tr>
<tr>
<td>
<a data-click-track-id="37" href="${
        depoloymentURL + "outh/password/" + token + "/" + user._id
      }" style="margin-top: 36px; -ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #ffffff; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 12px; font-smoothing: always; font-style: normal; font-weight: 600; letter-spacing: 0.7px; line-height: 48px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 220px; background-color: #00cc99; border-radius: 28px; display: block; text-align: center; text-transform: uppercase" target="_blank">
                                        Reset Password
                                      </a>
</td>
</tr>
</tbody></table>
</td>
</tr>
</tbody></table>
<table align="center" cellpadding="0" cellspacing="0" id="footer" style="background-color: #000; width: 100%; max-width: 680px; height: 100%;">
<tbody><tr>
<td>
<table align="center" cellpadding="0" cellspacing="0" class="footer-center" style="text-align: left; width: 100%; padding-left: 120px; padding-right: 120px;">
<tbody><tr>
<td colspan="2" style="padding-top: 72px; padding-bottom: 24px; width: 100%;">
<img src="https://www.pinclipart.com/picdir/big/57-576184_view-our-amazon-storefront-amazon-logo-white-png.png" style=" height: 100px">
</td>
</tr>
<tr>
<td colspan="2" style="padding-top: 24px; padding-bottom: 48px;">
<table cellpadding="0" cellspacing="0" style="width: 100%">
<tbody><tr>
<td style="width: 100%; height: 1px; max-height: 1px; background-color: #EAECF2; opacity: 0.19"></td>
</tr>
</tbody></table>
</td>
</tr>
<tr>
<td style="-ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #9095A2; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 15px; font-smoothing: always; font-style: normal; font-weight: 400; letter-spacing: 0; line-height: 24px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 100%;">
                                          If you have any questions or concerns, we're here to help. Contact us via our <a data-click-track-id="1053" href="" style="font-weight: 500; color: #ffffff" target="_blank">Help Center</a>.
                                        </td>
</tr>
<tr>
<td style="height: 72px;"></td>
</tr>
</tbody></table>
</td>
</tr>
</tbody></table>
</td>
</tr>
</tbody></table>



</body>`;

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        service: "gmail",

        auth: {
          user: "iti.amazon.mearn@gmail.com", // generated ethereal user
          pass: "abc@@123456", // generated ethereal password
        },
      });
      console.log("mail");

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Amzon ITI Project" <iti.amazon.mearn@gmail.com>', // sender address
        to: user.email, // list of receivers // to be changed to user email
        subject: "Reset Password of Amazon", // Subject line
        //text: "Hello world", // plain text body

        html: tempHTMl, // html body
      });
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    } catch (e) {
      console.log("catch statement", e);
    }
  });

  app.put("/resetpassword/changePassword/", (req, res) => {
    Users.find({ _id: req.body.id }, async function (err, USER) {
      if (err) throw err;
      console.log("test from put ");

      try {
        if (
          (await bcrypt.compare(req.body.token, USER[0].resetPasswordToken)) ===
          true
        ) {
          console.log("Match resetToken");
          console.log(req.body);
          console.log(USER[0].resetPasswordExpires);

          if (req.body.date < USER[0].resetPasswordExpires) {
            console.log("match time");

            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const hashedRepeatedPassword = await bcrypt.hash(
              req.body.repeatedPassword,
              salt,
              () => {
                Users.findByIdAndUpdate(
                  req.body.id,
                  {
                    password: hashedPassword,
                    repeatedPassword: hashedRepeatedPassword,
                    resetPasswordToken: "hashedResetPasswordToken",
                    resetPasswordExpires: Date.now(),
                  },
                  function (err, result) {
                    res
                      .status(202)
                      .send({ message: "Password Updated", result: "success" });
                    if (err) throw err;
                  }
                );
              }
            );
          } else {
            console.log("time expired");
            res
              .status(200)
              .send({ message: "Link has expired", result: "failed" });
          }

          // res.json({ accessToken: accessToken });
        } else {
          console.log("inCorrect token");
          res.status(200).send({
            message: "Technical Problem, please contanct us",
            result: "failed",
          });
        }
      } catch (e) {
        console.log("app change password catch staement", e);
        res.status(200).send({
          message: "Technical Problem, please contanct us",
          result: "failed",
        });
        // console.log('error occurred');
      }
    });
  });
};
