const Product = require('../models/productModel');
const path = require('path');
const encodeImageToBase64 = require('../helpers/imageToBase64');

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();

        if (products.length !== 0) {
            await Promise.all(products.map(async (product) => {
                //getting image file path from frontend response
                const imageFilePath = product.imageUrl;

                //extracting the image file name
                const imageFileName = path.basename(imageFilePath);


                //path from to next js image folder
                const pathfromNextjs = '../../dinein/public/foodItemPics'

                //creating the absolute path to get the image
                const absolutePath = path.join(__dirname, pathfromNextjs, imageFileName);

                try {
                    //encoding the 
                    const base64Image = await encodeImageToBase64(absolutePath);
                    product.image = base64Image;
                } catch (encodeError) {
                    console.error(`Error encoding image to base64: ${encodeError}`);
                    // Log the error, but continue with other products
                }
            }));

            res.status(200).json(products);
        } else {
            res.status(204).json({ message: 'No products found' });
        }
    } catch (error) {
        console.error(`Error in getting products: ${error}`);
        res.status(500).json({ message: 'Unexpected server error' });
    }
};
