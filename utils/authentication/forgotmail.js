const nodemailer = require("nodemailer");
const forgotmail = async (email,id) => {
    let transporter;
    try {
      transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: "devanshubhatnagar09@gmail.com",
          pass: "udswjudlksklppjy"
        }
      });
    } catch (error) {
      console.log(error);
    }
    const mailOptions = {
      from: "devanshubhatnagar09@gmail.com",
      to: email,
      subject: "reset your password from OUTFITTERS",
      html: `
      <h3>Click on the link below to Reset your password</h3>
      <a href="https://1f87-223-178-210-8.ngrok-free.app/forgot?id=${id}">Verify</a>`
    };
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
    } catch (error) {
      console.log(error);
    }
  }

    module.exports = forgotmail;