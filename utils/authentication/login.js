const User = require("../../modals/user");

function login(request, response){
    const email = request.body.email;
    const password = request.body.password;
    request.session.usernotfound = false;
    User.findOne({email: email, password: password, verified: true})
    .then(function(user){
        if(user){
            request.session.isLoggedIn = true;
            request.session.username = user.username;
            response.redirect("/");
        }else{
            request.session.usernotfound = true;
            response.redirect("/login");
        }
    })
}
module.exports = login;