const User = require("../../modals/user");
function forgotPass(request, response) {
  const id = request.query.id;
  const confirmPassword = request.body.confirmpassword;
  User.findOne({ _id: id })
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

