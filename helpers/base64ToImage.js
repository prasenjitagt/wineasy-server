
//calling fs module
const fs = require('fs');
const path = require('path');



// Function to encode image to base64
const saveBase64Image = async (base64String, relativePathtoNextJsFolder, imageName) => {
    try {

        //creating the absolute path to get the image
        const absolutePath = path.join(__dirname, relativePathtoNextJsFolder, imageName);

        console.log(absolutePath);
        // Remove the data:image/<image-type>;base64 prefix
        const data = base64String.replace(/^data:image\/\w+;base64,/, '');

        // Create a Buffer from the Base64 string
        const buffer = Buffer.from(data, 'base64');

        // Write the buffer to the specified file
        fs.writeFile(absolutePath, buffer, (err) => {
            if (err) {
                const { name, kind, message, type } = err;

                const errorObject = {
                    ERROR_MESSAGE: `ERROR IN base64ToImageAndSave.js while saving image : ${message}`,
                    ERROR_NAME: name,
                    ERROR_KIND: kind,
                    ERROR_TYPE: type,
                };

                // Log the error for debugging purposes
                console.error(errorObject);
            } else {
                console.log('Category Image saved successfully');

            }
        });


    } catch ({ name, kind, message, type }) {
        const errorObject = {
            ERROR_MESSAGE: `ERROR IN base64ToImageAndSave.js : ${message}`,
            ERROR_NAME: name,
            ERROR_KIND: kind,
            ERROR_TYPE: type,
        };

        // Log the error for debugging purposes
        console.error(errorObject);

    }
};



module.exports = saveBase64Image;
