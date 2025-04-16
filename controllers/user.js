const User = require("../models/user.js");

module.exports.renderSignUpForm = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.newSignUp =  async (req, res, next) => {
    try{
        let {username, email, password} = req.body;
    const newUser = new User({email, username});
    const registerdUser = await User.register(newUser, password);
    // console.log(registerdUser);
    req.login(registerdUser, (err) => {
        if(err) {
            return next(err); 
        }
        req.flash("success", "Welcome to WanderLust!");
        res.redirect("/listings");
    })
    
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/users/signup");
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.userLogin = async (req, res) => {
    req.flash("success", "Welcome back to WanderLust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.userLogout = (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err)
        }
        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    })
}