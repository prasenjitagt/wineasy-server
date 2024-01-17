

// calling and establishing database connection
// const connectDb = require('./../db/dbConfig');
// connectDb();


//calling Product model
const Product = require('./../models/productModel')


exports.getProducts = async (req, res, next) => {
    try {
        //getting products from database
        const products = await Product.find();

        //if there are products
        if (products) {
            res.status(200).json(products);
        } else {
            // if there are no products
            res.status(204).json({ message: 'No Data in Databse' });
        }
    } catch (error) {

        // sending error to frontend
        res.status(500).json({ message: `unexpected server error: ${error}` });
        //throwing error in backend
        throw new Error(`unexpected server error: ${error}`);
    }
}