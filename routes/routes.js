const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// calling ramdon id generator
const generateRandomId = require('./../helpers/randomIdGenerator');


//initialized image name
let finalImageName

// calling database connection
const connectDb = require('./../db/dbConfig');
connectDb();

//calling product model
const Product = require('./../models/productModel');


// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        //put wineasy-server folder and dineine next js project folder in same level
        cb(null, './../dinein/public/foodItemPics');


        // cb(null, './uploads');


    },
    filename: function (req, file, cb) {

        //generated random Image name
        const randomId = generateRandomId();


        // extension of the image
        const imageExtenstion = path.extname(file.originalname);


        finalImageName = randomId + imageExtenstion;



        cb(null, finalImageName);
    }
})

const upload = multer({ storage: storage })






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

module.exports = router;