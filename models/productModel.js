const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Please provide a product name"],
        unique: true,
    },
    imageUrl: {
        type: String,
        required: [true, "Please provide a Image so that I can create an image url"],
    },
    price: {
        type: String,
        required: [true, "Please provide price of product"],
    },
    typeOfProduct: {
        type: String,
        required: [true, "Please provide type of product e.g. Veg"],
    },
    categoryOfProduct: {
        type: String,
        required: [true, "Please provide category of product e.g. BIRYANI"],
    },
    description: {
        type: String,
        required: [true, "Please provide product description"],
    },
    createdAt: {
        type: Date,
        required: [true, "When was the product created"],
        unique: true,
    },
    updatedAt: {
        type: Date,
        required: [true, "When was the product updated"],
        unique: true,
    },




});


const Product = mongoose.model.products || mongoose.model("products", productSchema);

module.exports = Product;