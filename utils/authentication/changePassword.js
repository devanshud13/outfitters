const User = require("../../modals/user");
const verifymail = require("./verifyMail");

function changepassword(request, response) {
  const id = request.query.id;
  const password = request.body.confirmpassword;
  const subject = "Password Changed";

  User.findOne({ _id: id })
    .then(function (user) {
      if (!user) {
        response.status(404);
        response.send("User not found");
        console.log("error in changepassword")
      } else {
        user.password = password;
        user.save().then(function () {
          response.status(200);
          const html = `<h1>Hi ${user.username}</h1>
          <p>Your password has been changed successfully</p>`
          verifymail(subject,user.email,html);
          response.redirect("/");
        });
      }
    })
    .catch(function (error) {
      response.status(500);
      console.log(error);
      response.send("An error occurred while updating the password");
    });
}

module.exports = changepassword;