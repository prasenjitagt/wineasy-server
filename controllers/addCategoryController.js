

//calling category model
const Category = require('../models/productCategoryModel');



exports.addCategory = async (req, res, next) => {
    try {


        //Getting the category from frontend
        const { category } = await req.body;

        const categoryUpperCased = category.toUpperCase();


        //Creating New Category
        const newCategory = new Category({
            categoryName: categoryUpperCased,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });


        //saving to data
        await newCategory.save();

        res.status(200).json({ message: "data received successfully" });


    } catch ({ name, kind, message, type }) {


        const errorObject = {
            ERROR_MESSAGE: `ERROR IN addCategoryController.js : ${message}`,
            ERROR_NAME: name,
            ERROR_KIND: kind,
            ERROR_TYPE: type,
        };

        // Log the error for debugging purposes
        console.error(errorObject);

        // Generic server error
        res.status(500).json({ message: 'Unexpected server error' });


    }
};