

//calling path module
const path = require('path');

//calling fs module
const fs = require('fs');



//calling category model
const Category = require('../models/productCategoryModel');



exports.deleteCategory = async (req, res, next) => {
    try {

        // Getting base64-encoded category ID
        const base64EncodedId = req.query.categoryId;

        // Decoding base64 to get the original ID
        const originalId = Buffer.from(base64EncodedId, 'base64').toString('utf-8');


        //Deleted Product
        const deletedProduct = await Category.findOneAndDelete({ _id: originalId });


        if (deletedProduct) {





            //getting image file path from mongodb
            const imageFilePath = deletedProduct.imageUrl;

            //extracting the image file name
            const imageFileName = path.basename(imageFilePath);


            //path to next js image folder
            const pathfromNextjs = '../../dinein/public/catagoryPics';

            //creating the absolute path to get the image
            const absolutePath = path.join(__dirname, pathfromNextjs, imageFileName);

            try {
                fs.unlink(absolutePath, (fsError) => {
                    if (fsError) {
                        console.log('Error deleting image:', fsError);
                    } else {
                        console.log('Image deleted successfully');
                    }
                });
            } catch ({ name, kind, message, type }) {
                const errorObject = {
                    ERROR_MESSAGE: `ERROR IN deleteCategoryController.js IMAGE DELETION: ${message}`,
                    ERROR_NAME: name,
                    ERROR_KIND: kind,
                    ERROR_TYPE: type,

                };

                // Log the error for debugging purposes
                console.error(errorObject);

            }


            res.status(200).json({ message: 'successfully deleted' });
        } else {
            res.status(205).json({ message: 'No Such Category' });

        }




    } catch ({ name, kind, message, type }) {


        const errorObject = {
            ERROR_MESSAGE: `ERROR IN deleteCategoryController.js : ${message}`,
            ERROR_NAME: name,
            ERROR_KIND: kind,
            ERROR_TYPE: type,
        };

        // Log the error for debugging purposes
        console.error(errorObject);


        // Check for specific error types and respond accordingly
        if (name === 'CastError' && kind === 'ObjectId') {
            // Handle invalid ObjectId format
            res.status(400).json({ message: 'Invalid product ID format' });
        } else if (name === "TypeError") {
            res.status(400).json({ message: 'Invalid product ID Type' });
        }
        else {
            // Generic server error
            res.status(500).json({ message: 'Unexpected server error' });
        }


    }
}



