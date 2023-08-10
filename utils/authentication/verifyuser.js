const User = require("../../modals/user");

function verifyUser(request, response) {
  const id = request.query.id;

  User.findOne({ _id: id })
    .then(function (user) {
      if (!user) {
        response.status(404);
        response.send("User not found");
      } else {
        user.verified = true;
        return user.save();
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
    });
}

module.exports = verifyUser;

