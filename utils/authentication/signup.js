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
            verifymail(host,email, username, user._id);
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