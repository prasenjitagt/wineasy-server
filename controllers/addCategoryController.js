

//calling category model
const Category = require('../models/productCategoryModel');



exports.addCategory = async (req, res, next) => {
    try {


        //Getting the category from frontend
        const { category } = await req.body;

        const categoryUpperCased = category.toUpperCase();

        // setting which category to search
        const filter = { categoryName: categoryUpperCased };

        //checking if the category already exists
        const categoryIfExists = await Category.findOne(filter);



        if (categoryIfExists) {
            res.status(205).json({ message: "category already exists" });
        } else {

            //Creating New Category
            const newCategory = new Category({
                categoryName: categoryUpperCased,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            });


            //saving to database
            await newCategory.save();

            res.status(200).json({ message: "category saved" });
        }


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