const Listing = require('../models/listing.js')

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res) => {
    let {id} = req.params;
    const info = await Listing.findById(id).populate({path:"reviews", populate:{path:"author"}}).populate("owner");
    if(!info){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{info});
}

module.exports.createNewListing = async (req, res) => {
        
        const newListing = new Listing(req.body.listing);
        newListing.image = {filename:newListing.imageName, url:req.file.path};
        delete newListing.imageName;
        newListing.owner = req.user._id;
        
        await newListing.save();
        req.flash("success", "New Listing Created!");

        res.redirect("/listings");
}

module.exports.renderEditForm = async (req, res) => {
    let {id} = req.params;
    const info = await Listing.findById(id);

    if(!info){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    }

    res.render("listings/edit.ejs",{info});
}

module.exports.updateListing = async (req, res) => {
    try {
        let { id } = req.params;
        let listing = req.body.listing;
        let oldListing = await Listing.findById(id);

        if (!oldListing) {
            req.flash("error", "Listing not found!");
            return res.redirect("/listings");
        }

        // Use imageName from form input if available
        let newFilename = listing.imageName || oldListing.image.filename;
        let newUrl = oldListing.image.url; // Default to old image URL

        // If a new file is uploaded, update the URL
        if (req.file) {
            newUrl = req.file.path; // Update with new Cloudinary image URL
        }

        // Update listing in DB with correct image details
        await Listing.findByIdAndUpdate(id, {
            ...listing,
            image: { filename: newFilename, url: newUrl } 
        });

        req.flash("success", "Listing Updated!");
        res.redirect(`/listings/${id}`);

    } catch (error) {
        console.error("Error updating listing:", error);
        req.flash("error", "Something went wrong while updating!");
        res.redirect("/listings");
    }
};


module.exports.deleteListing = async (req, res) => {

    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted")
    res.redirect('/listings');
};