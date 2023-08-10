const User = require("../../modals/user");

function login(request, response){
    const username = request.body.username;
    const password = request.body.password;
    request.session.usernotfound = false;
    User.findOne({username: username, password: password, verified: true})
    .then(function(user){
        if(user){
            request.session.isLoggedIn = true;
            request.session.username = username;
            response.redirect("/");
        }else{
            request.session.usernotfound = true;
            response.redirect("/login");
        }
    })
}
module.exports = login;