const nodemailer = require("nodemailer");
const verifymail = async (host,email, username, id) => {
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
      subject: "Verify your email",
      html: `<h1>Hi ${username}</h1>
      <h3>Click on the link below to verify your email</h3>
      <a href="${host}/verify?id=${id}">Verify</a>`
    };
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(" verifymail Email sent");
    } catch (error) {
      console.log(error);
    }
  }

    module.exports = verifymail;