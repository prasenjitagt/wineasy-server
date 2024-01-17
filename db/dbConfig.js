require('dotenv').config();

const mongoose = require('mongoose');

const connectDb = async () => {

    try {

        //creating mongodb connection
        mongoose.connect(process.env.MONGODB_URL);
        const mongooseConnection = await mongoose.connection;






        //When db connected
        mongooseConnection.on('connected', () => {
            console.log('MongoDB connected');
        })

        //on connection error with DB
        mongooseConnection.on('error', (error) => {
            console.log(`Error on Mongodb connection: ${error}`);
            process.exit();
        })




    } catch (error) {


        console.log(`Error occured: ${error}`);
    }

}


module.exports = connectDb;