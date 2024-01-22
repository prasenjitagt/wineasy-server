const path = require('path');
const fs = require('fs');
const multer = require('multer');
const Product = require('../models/productModel');

//initialized image name for adding product
let finalImageName

//generated random Image name
// const randomId = await generateRandomId();


exports.editProduct = async (req, res) => {
    try {

        //location of image from Next js point of view
        const locationOfImage = "/foodItemPics/";

        //Image path that is save to be in database
        const imageUrlforDb = locationOfImage + finalImageName;

        //Incoming form Data
        const formData = await req.body;

        //destructuring the data
        const { name, price, description, type, category } = formData;

        // setting which product to update?
        const filter = { _id: originalId };

        //setting what to update?
        const update = {
            productName: name,
            imageUrl: imageUrlforDb,
            isAvailable: true,
            updatedAt: Date.now()

        };


        //saving to data
        await newProduct.save();

        res.status(200).json({ message: "data received successfully" });


    } catch (error) {
        res.status(500).json({ message: `Error occured: ${error}` });
        console.log(`Error: ${error}`);
    }
};