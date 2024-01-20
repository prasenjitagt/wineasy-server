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
let finalImageName

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
})

//Multer upload function
const upload = multer({ storage: storage })


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

        //Incoming file
        const file = await req.file;



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


//calling controller to get products
const listProductController = require('../controllers/listProductController');
//route for getting products
router.get('/product-list', listProductController.getProducts);



//calling controller to delete products
const deleteProductController = require('../controllers/deleteProductController');
//route for deleting products
router.delete('/delete-product', deleteProductController.deleteProduct);



//calling controller to chage isAvailable in products model
const isAvailableController = require('../controllers/isAvailableController.js');
//route for deleting products
router.put('/is-available', isAvailableController.isAvailable);



module.exports = router;