const joi = require("joi");

module.exports.listingSchema = joi.object({
    listing : joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        image: joi.object({
            filename: joi.string().required(),
            url: joi.string().required()
        }),
        price: joi.number().required().min(0),
        location: joi.string().required(),
        country: joi.string().required(),
        email: joi.string().email().required(),
        phone: joi.string().pattern(/^[0-9]{10}$/).required(),
        websiteName: joi.string(),
        websiteUrl: joi.string().uri(),
    }).required()
});

module.exports.reviewSchema = joi.object({
    review: joi.object({
        rating: joi.number().required().min(1).max(5),
        comment: joi.string().required()
    }).required()
})