const crypto = require('crypto');
const Product = require('./../models/productModel'); // Import your Product model

const generateRandomId = async () => {
    let randomId;
    let exists;

    do {
        // Generate a random ID
        randomId = crypto.randomUUID();

        // Check if the ID already exists in the database
        exists = await checkIfIdExists(randomId);

        // If the ID exists, regenerate it and check again
    } while (exists);

    return randomId;
};

// Function to check if the ID already exists in the database
async function checkIfIdExists(id) {
    try {
        const existingProduct = await Product.findOne({ imageUrl: id });
        return !!existingProduct;
    } catch (error) {
        throw error;
    }
}

module.exports = generateRandomId;
