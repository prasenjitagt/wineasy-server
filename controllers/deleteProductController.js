
exports.deleteProduct = async (req, res, next) => {
    try {

        //getting product ID
        const idToBeDelete = await req;




        console.log(idToBeDelete);


        res.status(200).json({ message: 'successfully delete' });




    } catch (error) {

        // sending error to frontend
        res.status(500).json({ message: `unexpected server error: ${error}` });
        //throwing error in backend
        throw new Error(`unexpected server error: ${error}`);
    }
}



