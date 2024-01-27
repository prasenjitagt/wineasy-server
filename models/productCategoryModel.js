const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: [true, "Please provide a category name"],
        unique: true,
    },
    imageUrl: {
        type: String,
        required: [true, "Please provide a Image so that I can create an image url"],
        unique: true,
    },
    createdAt: {
        type: Date,
        required: [true, "When was the category created"],
        unique: true,
    },
    updatedAt: {
        type: Date,
        required: [true, "When was the category updated"],
        unique: true,
    },

});


const Category = mongoose.model.categories || mongoose.model("categories", categorySchema);

module.exports = Category;