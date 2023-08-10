const User = require("../../modals/user");

function forgotPass(request, response) {
  const gmail = request.session.email;
  const confirmPassword = request.body.confirmpassword;
  console.log(gmail);
  User.findOne({ email: gmail})
    .then(function (user) {
      if (!user) {
        request.session.usernotfound = true;
        response.redirect("/signup");
      } else {
        user.password = confirmPassword;
        user.save().then(()=>{response.redirect("/login");})
      }
    })
    .then(function (updatedUser) {
      if (updatedUser) {
        response.status(200);
        response.redirect("/login");
      }
    })
    .catch(function (error) {
      response.status(500);
      console.log(error);
      response.send("An error occurred while updating the password");
    });
}

module.exports = forgotPass;

