const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const passport = require("passport");
const { saveRedirectUrl } = require('../middleware.js');

// Controller...
const userController = require('../controllers/user.js');

// show signup form and new signup...
router.route("/signup")
    .get(userController.renderSignUpForm)
    .post(wrapAsync(userController.newSignUp))

// show login form and user login...
router.route("/login")  
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/users/login", failureFlash: true}), userController.userLogin);

// user logout
router.get("/logout", userController.userLogout);

module.exports = router;