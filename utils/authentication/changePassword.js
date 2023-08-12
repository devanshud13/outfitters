const User = require("../../modals/user");

function changepassword(request, response) {
console.log(request.session.email)
  // const email = request.body.email;
  const id = request.query.id;
  console.log(id);
  const password = request.body.confirmpassword;

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