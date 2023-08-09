// verify.js

const fs = require("fs");

function verifyUser(request, response) {
    const id = request.query.id;
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
            return user.id === id;
          });
          if (filteredUser.length > 0) {
            filteredUser[0].verified = true;
            fs.writeFile("user.txt", JSON.stringify(users, null, 2), function (
              err
            ) {
              if (err) {
                response.status(500);
                console.log(err);
              } else {
                response.status(200);
                response.redirect("/login");
              }
            });
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
module.exports = verifyUser;