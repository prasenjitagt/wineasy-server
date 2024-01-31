const mongoose = require('mongoose');

const gstSchema = new mongoose.Schema({
    sgst: {
        type: String,
        required: [true, "Please provide SGST"]
    },
    cgst: {
        type: String,
        required: [true, "Please provide CGST"]
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

const Gst = mongoose.model.gsts || mongoose.model("gsts", gstSchema);


module.exports = Gst;