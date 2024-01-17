const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

let imageName = "ads";

// calling database connection
const connectDb = require('./../db/dbConfig');
connectDb();

//calling product model
const Product = require('./../models/productModel');


// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        //put wineasy-server folder and dineine next js project folder in same level
        // cb(null, './../dinein/public/uploads');


        cb(null, './uploads');


    },
    filename: function (req, file, cb) {

        const imageExtenstion = path.extname(file.originalname);

        const finalImageName = imageName + imageExtenstion;
        console.log(finalImageName);

        //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        //   cb(null, file.fieldname + '-' + uniqueSuffix);


        cb(null, finalImageName);
    }
})

const upload = multer({ storage: storage })






router.post('/add-product', upload.single('file'), async (req, res) => {
    try {


        const formData = await req.body;

        const { name, price, description, type, category } = formData;

        const file = await req.file;

        const newProduct = new Product({
            productName: name,
            imageUrl: 'null', //put random name here
            price: price,
            typeOfProduct: type,
            categoryOfProduct: category,
            description: description,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });

        const savedProduct = await newProduct.save();

        console.log(savedProduct);
        console.log('data saved to db');




        res.status(200).json({ message: "data received successfully" });


    } catch (error) {
        res.status(500).json({ message: `Error occured: ${error}` });
        console.log(`Error: ${error}`);
    }





})

module.exports = router;