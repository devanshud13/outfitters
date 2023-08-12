const nodemailer = require("nodemailer");
require('dotenv').config()
const verifymail = async (subject,email,html) => {
    let transporter;
    try {
      transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
    } catch (error) {
      console.log(error);
    }
    const mailOptions = {
      from: "devanshubhatnagar09@gmail.com",
      to: email,
      subject: `${subject}`,
      html: `${html}`
    };
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(" verifymail Email sent");
    } catch (error) {
      console.log(error);
    }
  }

    module.exports = verifymail;