const express = require('express');
const router = express.Router();
const multer = require('multer');

const fs = require('fs');
const path = require('path');


// calling ramdon id generator
const generateRandomId = require('../helpers/randomIdGenerator');

// calling and establishing database connection
const connectDb = require('../db/dbConfig.js');
connectDb();

//calling product model
const Product = require('../models/productModel');

//initialized image name for adding product
let finalImageName;

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        //put wineasy-server folder and dineine next js project folder in same level
        cb(null, './../dinein/public/foodItemPics');


        // cb(null, './uploads');


    },
    filename: async (req, file, cb) => {

        //generated random Image name
        const randomId = await generateRandomId();


        // extension of the image
        const imageExtenstion = path.extname(file.originalname);


        finalImageName = randomId + imageExtenstion;



        cb(null, finalImageName);
    }
});


// Create an instance of the multer middleware
const upload = multer({ storage: storage });


// route for adding product to database
router.post('/add-product', upload.single('file'), async (req, res) => {
    try {

        //location of image from Next js point of view
        const locationOfImage = "/foodItemPics/";

        //Image path that is save to be in database
        const imageUrlforDb = locationOfImage + finalImageName;

        //Incoming form Data
        const formData = await req.body;

        //destructuring the data
        const { name, price, description, type, category } = formData;



        // Creating a product from the incoming form data
        const newProduct = new Product({
            productName: name,
            imageUrl: imageUrlforDb,
            price: price,
            typeOfProduct: type,
            categoryOfProduct: category,
            description: description,
            isAvailable: true,
            createdAt: Date.now(),
            updatedAt: Date.now(),

        });


        //saving to data
        await newProduct.save();

        res.status(200).json({ message: "data received successfully" });


    } catch (error) {
        res.status(500).json({ message: `Error occured: ${error}` });
        console.log(`Error: ${error}`);
    }





})





//calling controller to chage isAvailable in products model
const editProductController = require('../controllers/editProductController.js');
//route for changing is Product Avaiable state
// router.post('/edit-product', upload.single('file'), editProductController.editProduct);

//jugar try replacing with above controller method
router.post('/edit-product', upload.single('file'), async (req, res) => {
    try {

        //location of image from Next js point of view
        const locationOfImage = "/foodItemPics/";

        //Image path that is save to be in database
        const imageUrlforDb = locationOfImage + finalImageName;

        //Incoming form Data
        const formData = await req.body;

        //destructuring the data
        const { base64EncodedId, name, price, description, type, category } = formData;

        // Decoding base64 to get the original ID
        const originalId = Buffer.from(base64EncodedId, 'base64').toString('utf-8');

        // setting which product to update?
        const filter = { _id: originalId };

        //setting what to update?
        const update = {
            productName: name,
            imageUrl: imageUrlforDb,
            price: price,
            typeOfProduct: type,
            categoryOfProduct: category,
            description: description,
            isAvailable: true,
            updatedAt: Date.now()

        };

        // getting the previous value if exists
        const productBeforeUpdation = await Product.findOneAndUpdate(filter, update);


        if (productBeforeUpdation) {

            //getting image file path from mongodb
            const imageFilePath = productBeforeUpdation.imageUrl;

            //extracting the image file name
            const imageFileName = path.basename(imageFilePath);


            //path to next js image folder
            const pathtoNextjsImageFolder = '../../dinein/public/foodItemPics';

            //creating the absolute path to get the image
            const absolutePath = path.join(__dirname, pathtoNextjsImageFolder, imageFileName);

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
                    ERROR_MESSAGE: `ERROR IN routes.js (/edit-product) IMAGE DELETION: ${message}`,
                    ERROR_NAME: name,
                    ERROR_KIND: kind,
                    ERROR_TYPE: type,

                };

                // Log the error for debugging purposes
                console.error(errorObject);

            }


            res.status(200).json({ message: 'successfully deleted' });
        } else {
            res.status(404).json({ message: 'No Such Product' });

        }

    } catch ({ name, kind, message, type }) {


        const errorObject = {
            ERROR_MESSAGE: `ERROR IN routes.js (/edit-product) : ${message}`,
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




});




//calling controller to get products
const listProductController = require('../controllers/listProductController.js');
//route for getting products
router.get('/product-list', listProductController.getProducts);



//calling controller to delete products
const deleteProductController = require('../controllers/deleteProductController.js');
//route for deleting products
router.delete('/delete-product', deleteProductController.deleteProduct);



//calling controller to chage isAvailable in products model
const isAvailableController = require('../controllers/isAvailableController.js');
//route for changing is Product Avaiable state
router.put('/is-available', isAvailableController.isAvailable);



//calling controller to add Category in catagories model
const addCategoryController = require('../controllers/addCategoryController.js');
//route for adding Categories
router.post('/add-category', addCategoryController.addCategory);




//calling controller to get Categories in catagories model
const categoryListController = require('../controllers/categoryListController.js');
//route for getting Categories
router.get('/get-categories', categoryListController.getCategories);




//calling controller to delete products
const deleteCategoryController = require('../controllers/deleteCategoryController.js');
//route for deleting products
router.delete('/delete-category', deleteCategoryController.deleteCategory);




//calling controller to edit gst
const editGstController = require('../controllers/editGstController.js');
//route for editing gst
router.post('/edit-gst', editGstController.editGst);



//calling controller to get gst
const getGstController = require('../controllers/getGstController.js');
//router for getting gst details
router.get('/get-gst', getGstController.getGst);


//calling controller for food ready signal
const foodReadyController = require('../controllers/foodReadyController.js');
//router for sending food ready signal to DB
router.put('/food-ready', foodReadyController.foodReady);



//calling controller for food canceled signal
const foodCanceledController = require('../controllers/foodCanceledController.js');
//router for sending food ready signal to DB
router.put('/food-canceled', foodCanceledController.foodCanceled);





module.exports = router;