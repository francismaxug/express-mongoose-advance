const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const sendEmailToUser = async (options) => {
  const mailOptions = {
    auth: {
      api_key: process.env.SEDGRID_API_KEY
    },
  };
  const transporter = nodemailer.createTransport(sgTransport(mailOptions));

  const sendIt = {
    to: options.email,
    from: process.env.SENDER_EMAIL,
    subject: options.subject,
    text: options.text,
    html: options.message,
  };

  return transporter.sendMail(sendIt, function (err, res) {
    if (err) {
      console.log(err);
    }
    console.log(res);
  });
};

module.exports = sendEmailToUser;
