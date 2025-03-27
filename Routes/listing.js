const express = require('express');
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

// for parsing the form data which deals with file storage...
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

// Controller
const listingController = require("../controllers/listings.js");

// Using Router.route()

// index and create route...
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createNewListing)); 
    // validateListing, this is the middleware to add in the above post route but you need to find logic for its proper implementation.

// New Listing Route...
router.get('/new', isLoggedIn, listingController.renderNewForm);

// show, update and delete route...
router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, wrapAsync(listingController.deleteListing))
// validateListing, this is the middleware to add in the above put route but you need to find logic for its proper implementation.

// Edit Route...
router.get('/:id/edit', isLoggedIn, wrapAsync(listingController.renderEditForm));

module.exports = router;