const fs = require("fs");

function changepassword(request, response) {
    const email = request.body.email;
    const password = request.body.confirmpassword;
    fs.readFile("user.txt", "utf-8", function (error, data) {
      if (error) {
        response.status(500);
        console.log(error);
      } else {
        if (data.length === 0) {
          data = "[]";
        }
        try {
          const users = JSON.parse(data);
          const filteredUser = users.filter(function (user) {
            return user.email === email;
          });
          if (filteredUser.length > 0) {
            filteredUser[0].password = password;
            fs.writeFile(
              "user.txt",
              JSON.stringify(users, null, 2),
              function (err) {
                if (err) {
                  response.status(500);
                  console.log(err);
                } else {
                  response.status(200);
                  response.redirect("/");
                }
              }
            );
          } else {
            response.status(404);
            response.send("User not found");
          }
        } catch (error) {
          response.status(500);
          console.log(error);
        }
      }
    });
}

module.exports = changepassword;