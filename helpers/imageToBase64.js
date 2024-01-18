
//calling fs module
const fs = require('fs');



// Function to encode image to base64
const encodeImageToBase64 = (absolutepath) => {
    const imageBuffer = fs.readFileSync(absolutepath);
    const base64Image = imageBuffer.toString('base64');
    return base64Image;
};



module.exports = encodeImageToBase64;
