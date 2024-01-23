

//calling category model
const Category = require('../models/productCategoryModel');



exports.getCategories = async (req, res, next) => {
    try {

        //Getting categories from mongodb
        const categories = await Category.find();

        //Checking if there are any categories available
        if (categories.length !== 0) {
            res.status(200).json(categories);
        } else {
            res.status(204).json({ message: 'No categories found' });
        }

    } catch ({ name, kind, message, type }) {


        const errorObject = {
            ERROR_MESSAGE: `ERROR IN categoryListController.js : ${message}`,
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