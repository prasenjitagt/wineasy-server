
//calling Product model
const Product = require('./../models/productModel')

//calling path function 
const path = require('path');


//calling the base64converter fucntion
const encodeImageToBase64 = require('./../helpers/imageToBase64');



exports.getProducts = async (req, res, next) => {
    try {

        //getting products from database
        const products = await Product.find();




        //if there are products
        if (products.length != 0) {

           await products.forEach( async (product) => {
                //getting the product image path from next js poit of view
                const ImageFilePath = product.imageUrl;

                //extracting the image file name
                const ImageFileName = path.basename(ImageFilePath);

                //absolute path to that image
                const absolutepath = path.join(__dirname, '../../dinein/public/foodItemPics', ImageFileName);

                //converting to base64
                const base64Image = await encodeImageToBase64(absolutepath);


                product.image = base64Image;


            });


            res.status(200).json(products);



        } else {
            // if there are no products
            res.status(204).json([{ message: 'No products found' }]);
        }
    } catch (error) {

        // sending error to frontend
        res.status(500).json({ message: `unexpected server error: ${error}` });
        //throwing error in backend
        throw new Error(`unexpected server error: ${error}`);
    }
}



