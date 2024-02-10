//calling Order Model
const Order = require('../models/orderModel');


exports.foodReady = async (req, res, next) => {
    try {

        // Getting base64-encoded product ID
        const base64EncodedOrderId = req.query.orderId;

        // Decoding base64 to get the original ID
        const originalOrderId = Buffer.from(base64EncodedOrderId, 'base64').toString('utf-8');

        // setting which product to update?
        const filter = { orderId: originalOrderId };

        //setting what to update?
        const update = {
            orderStatus: "fulfilled",
            updatedAt: Date.now()
        };

        // getting the updated value if exists
        const updatedOrder = await Order.findOneAndUpdate(filter, update, { new: true });

        // console.log(base64EncodedOrderId);


        if (updatedOrder) {

            res.status(200).json({ message: 'Order status successfully changed' });

        } else {
            res.status(404).json({ message: `Order Doesn't Exist ` });


        }




    } catch ({ name, kind, message, type }) {


        const errorObject = {
            ERROR_MESSAGE: `ERROR IN foodReadyController.js : ${message}`,
            ERROR_NAME: name,
            ERROR_KIND: kind,
            ERROR_TYPE: type,
        };

        // Log the error for debugging purposes
        console.error(errorObject);


        // Check for specific error types and respond accordingly
        if (name === 'CastError' && kind === 'ObjectId') {
            // Handle invalid ObjectId format
            res.status(400).json({ message: 'Invalid order ID format' });
        } else if (name === "TypeError") {
            res.status(400).json({ message: 'Invalid order ID Type' });
        }
        else {
            // Generic server error
            res.status(500).json({ message: 'Unexpected server error' });
        }


    }
}



