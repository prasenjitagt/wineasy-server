const crypto = require('crypto');

const generateRandomId = () => {

    const randomId = crypto.randomUUID();

    return randomId;

}


module.exports = generateRandomId;


