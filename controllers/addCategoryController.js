

const path = require('path');


//calling category model
const Category = require('../models/productCategoryModel');

// calling ramdon id generator
const generateRandomId = require('../helpers/randomIdGenerator');

//calling base64ToimageAndSave fucntion
const saveBase64Image = require('../helpers/base64ToImage');

//initialized image name for adding product
let finalImageName;





exports.addCategory = async (req, res, next) => {
    try {
        //Getting the category from frontend
        const { category, categoryImage, imageName } = await req.body;



        //generated random Image name
        const randomId = await generateRandomId();


        // extension of the image
        const imageExtenstion = path.extname(imageName);


        finalImageName = randomId + imageExtenstion;

        // folderPath to next js image folder
        const folderPath = '../../dinein/public/catagoryPics';


        //saving the image
        await saveBase64Image(categoryImage, folderPath, finalImageName);


        //location of image from Next js point of view
        const locationOfImage = "/catagoryPics/";

        //Image path that is save to be in database
        const imageUrlforDb = locationOfImage + finalImageName;





        //converting the category name to uppercase 
        const categoryUpperCased = category.toUpperCase();

        // setting which category to search
        const filter = { categoryName: categoryUpperCased };

        //checking if the category already exists
        const categoryIfExists = await Category.findOne(filter);



        if (categoryIfExists) {
            res.status(205).json({ message: "category already exists" });
        } else {

            //Creating New Category
            const newCategory = new Category({
                categoryName: categoryUpperCased,
                imageUrl: imageUrlforDb,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            });


            //saving to database
            await newCategory.save();

            res.status(200).json({ message: "category saved" });
        }


    } catch ({ name, kind, message, type }) {


        const errorObject = {
            ERROR_MESSAGE: `ERROR IN addCategoryController.js : ${message}`,
            ERROR_NAME: name,
            ERROR_KIND: kind,
            ERROR_TYPE: type,
        };

        // Log the error for debugging purposes
        console.error(errorObject);

        // Generic server error
        res.status(500).json({ message: 'Unexpected server error' });


    }
};