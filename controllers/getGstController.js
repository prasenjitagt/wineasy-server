const Gst = require('../models/gstModel');



exports.getGst = async (req, res, next) => {

    try {

        //getting gst details from mongdb
        const gstDetails = await Gst.find();
        if (gstDetails.length !== 0) {
            res.status(200).json(gstDetails[0]);
        } else {
            res.status(204).json({ message: 'No gstDetails found' });
        }






    } catch ({ name, kind, message, type }) {

        const errorObject = {
            ERROR_MESSAGE: `ERROR IN getGstController.js : ${message}`,
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