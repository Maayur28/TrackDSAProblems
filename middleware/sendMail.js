const nodemailer = require("nodemailer");
sendMailObj = {};

sendMailObj.sendOtpMail = (arr) => {
  const transport = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    secure: true,
    secureConnection: false, // TLS requires secureConnection to be false
    tls: {
      ciphers: "SSLv3",
    },
    requireTLS: true,
    port: 465,
    debug: true,
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
  });
  const message = {
    from: process.env.email,
    to: "mayuragarwal2812@gmail.com",
    subject: "Problems of the day",
    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2;color:black">
          <div style="margin:20px auto;width:90%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
          <p style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">TrackDSA</p>
          </div>
          <div>
          <br><br><a href=${arr[0].url} style="margin-top:10px;color:white;background-color:rgb(0,21,41);padding:10px 20px;border-radius:50px;text-decoration:none ">${arr[0].title}</a>
          <br><br><a href=${arr[1].url} style="margin-top:10px;color:white;background-color:rgb(0,21,41);padding:10px 20px;border-radius:50px;text-decoration:none ">${arr[1].title}</a>
          <br><br><a href=${arr[2].url} style="margin-top:10px;color:white;background-color:rgb(0,21,41);padding:10px 20px;border-radius:50px;text-decoration:none ">${arr[2].title}</a>
          </div>
          <br><br>
          <p style="font-size:0.9em;">Regards,<br />TrackDSA Team</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          <p>Mayur Agarwal</p>
          <p>007, Uttar Pradesh</p>
          <p>India</p>
          </div>
          </div>
          </div>`,
  };
  transport.sendMail(message, (error, info) => {
    if (error) {
      console.log(error);
      throw error;
    } else {
      console.log("success");
    }
  });
};
module.exports = sendMailObj;
