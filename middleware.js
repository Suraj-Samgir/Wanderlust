const Listing = require('./models/listing');
const Review = require('./models/review.js');
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    console.log(req.originalUrl);
    if(!req.isAuthenticated()){
        // save the path if the user is not logged in...
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be logged in to create listing!");
        res.redirect("/users/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let {id} = req.params;
        let result = await Listing.findById(id);

    const currUser = res.locals.currUser;

    if(!currUser && result.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error","You are not the owner of this listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    let {id, reviewId} = req.params;

    let result = await Review.findById(reviewId);
    
    if(!result.author.equals(res.locals.currUser._id)) {
        req.flash("error","You did not create this review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

// function for Listing Schema Validation...
module.exports.validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);

    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, error);
    } else {
        next();
    }
}

// function for Review Schema Validation...
module.exports.validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);

    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, error);
    } else {
        next();
    }
}