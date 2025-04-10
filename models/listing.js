const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { link } = require('joi');


const listingSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    image: {
        filename: { type: String, default: "default file" },
        url: { 
            type: String, 
            default: "https://images.unsplash.com/photo-1471623432079-b009d30b6729?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    },
    price: { type: Number },
    location: { type: String },
    country: { type: String },
    email: {type: String},
    phone: {type: String},
    websiteName: {type: String},
    websiteUrl: {type: String},
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    // category: {
    //     type:String,
    //     enum: ["mountains", "arctic", "farms", "camping", "pools", "castles", "iconic cities", "rooms", "trending"]
    // }
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
})

module.exports = mongoose.model("Listing", listingSchema);
