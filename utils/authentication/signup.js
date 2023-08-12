const User = require("../../modals/user");
const nodemailer = require("nodemailer");
const verifymail = require("./verifyMail");
const mongoose = require("mongoose");

function signup(request, response) {
  const username = request.body.username;
  const email = request.body.email;
  const password = request.body.password;
  const verify = false;
  const host = request.headers.host;
  const subject = "Verify your email";
  const newUser = new User({
    username: username,
    password: password,
    email: email,
    verified: verify,
  });

  User.findOne({ email: email })
    .then(function (user) {
      if (user) {
        request.session.email = email;
        response.redirect("/signup");
      } else {
        newUser.save()
          .then(function (user) {
            response.status(200);
            const html=`<h1>Hi ${username}</h1>
            <h3>Click on the link below to verify your email</h3>
            <a href="${host}/verify?id=${user._id}">Verify</a>`
            verifymail(subject,email,html);
            request.session.username = null;
            request.session.usernotfound = false;
            response.redirect("/login");
          })
          .catch(function (error) {
            response.status(500);
            console.log(error);
          });
      }
    })
    .catch(function (error) {
      response.status(500);
      console.log(error);
    });
}

module.exports = signup;









// const User = require("../../modals/user");

// function signup(request, response) {
//   const username = request.body.username;
//   const email = request.body.email;
//   const password = request.body.password;

//   const newUser = new User({
//     username: username,
//     email: email,
//     password: password
//   });

//   User.findOne({ email: email })
//     .then(function (user) {
//       if (user) {
//         request.session.email = email;
//         response.redirect("/signup");
//       } else {
//         newUser.save()
//           .then(function (user) {
//             response.status(200);
//             request.session.username = null;
//             request.session.usernotfound = false;
//             response.redirect("/login");
//           })
//           .catch(function (error) {
//             response.status(500);
//             console.log(error);
//           });
//       }
//     })
//     .catch(function (error) {
//       response.status(500);
//       console.log(error);
//     });
// }

// module.exports = signup;