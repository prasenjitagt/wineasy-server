
//calling product model
const Product = require('../models/productModel');

exports.isAvailable = async (req, res, next) => {
    try {

        // Getting base64-encoded product ID
        const base64EncodedId = req.query.productId;

        const isAvailableFromFrontend = req.query.isAvailableFromFrontend;

        // Decoding base64 to get the original ID
        const originalId = Buffer.from(base64EncodedId, 'base64').toString('utf-8');

        // setting which product to update?
        const filter = { _id: originalId };

        //setting what to update?
        const update = {
            isAvailable: isAvailableFromFrontend,
            updatedAt: Date.now()

        };

        // getting the updated value if exists
        const updatedProduct = await Product.findOneAndUpdate(filter, update, { new: true });



        if (updatedProduct) {
            res.status(200).json({ message: 'successfully changed' });

        } else {
            res.status(404).json({ message: `Product Doesn't Exist ` });


        }







    } catch ({ name, kind, message }) {

        const errorObject = {
            ERROR_MESSAGE: `ERROR IN isAvailableController.js : ${message}`,
            ERROR_NAME: name,
            ERROR_KIND: kind,
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