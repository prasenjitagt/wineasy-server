const Gst = require('../models/gstModel');


exports.editGst = async (req, res, next) => {

    try {

        //Getting the Gst from frontend
        const { sgst, cgst, } = await req.body;

        // setting which Gst to search
        const filter = { sgst: sgst, cgst: cgst };

        //checking if the Gst already exists
        const gstIfExists = await Gst.findOne(filter);

        if (gstIfExists) {
            res.status(205).json({ message: "gst already exists" });
        } else {

            //Creating New Gst
            const newGst = new Gst({
                sgst: sgst,
                cgst: cgst,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            });


            //saving to database
            await newGst.save();

            res.status(200).json({ message: "gst saved" });
        }


    } catch ({ name, kind, message, type }) {

        const errorObject = {
            ERROR_MESSAGE: `ERROR IN editGstController.js : ${message}`,
            ERROR_NAME: name,
            ERROR_KIND: kind,
            ERROR_TYPE: type,
        };

        // Log the error for debugging purposes
        console.error(errorObject);

        // Generic server error
        res.status(500).json({ message: 'Unexpected server error' });

    }
}