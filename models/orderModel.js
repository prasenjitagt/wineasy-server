const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({



    orderStatus: {
        type: String,
        required: [true, "Order Status is Mandatory"],
        enum: ["pending", "fulfilled", "canceled"],
    },

    createdAt: {
        type: Date,
        required: [true, "When was the category created"],
        unique: true,
    },
    updatedAt: {
        type: Date,
        required: [true, "When was the category updated"],
        unique: true,
    },
});


const Order = mongoose.model.orders || mongoose.model("orders", orderSchema);

module.exports = Order;
