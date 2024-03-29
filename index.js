const express = require('express');
const app = express();

//http for socket io
const http = require('http');
const httpServer = http.createServer(app);

//dot env calling
require('dotenv').config();



//middlewears
const cors = require('cors');
app.use(cors());


const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '35mb' }));

app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: '35mb',
        parameterLimit: 50000,
    }));


//router for routes
const router = require('./routes/routes');
app.use('/api', router);






//Importing Order Model
const Order = require('./models/orderModel');
//socket io for sending and recieving orders instantly
const { Server } = require('socket.io');
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: '*'
    }
});





io.on("connection", (socket) => {


    console.log(socket.id, 'connected at', Date.now());

    socket.on('orderFromClient', async (cartItemsAndCount) => {

        try {

            //generating a unique ID for Order Identification
            const uniqueId = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));


            //Getting the Exact Time of Order
            const currentDate = new Date();
            let currentTime = currentDate.toLocaleTimeString();


            //converting to hours and minutes and uppercased AM and PM
            currentTime = currentTime.slice(0, 8) + currentTime.slice(8, currentTime.length).toUpperCase();



            //creating order to send
            const orderWithTime = [cartItemsAndCount, { orderedAt: currentTime, uniqueId: uniqueId, orderStatus: "pending" }];

            //setting the value to send in MongoDB
            const newOrder = new Order({

                orderId: uniqueId,
                orderItems: cartItemsAndCount,
                orderStatus: "pending",
                createdAt: Date.now(),
                updatedAt: Date.now(),
            })

            //Saving in DB
            const savedOrder = await newOrder.save();

            //If Save Successfull then Send to Frontend
            if (savedOrder) {
                io.emit('orderToKitchen', orderWithTime);
            }


        } catch ({ name, kind, message, type }) {
            const errorObject = {
                ERROR_MESSAGE: `ERROR IN addCategoryController.js : ${message}`,
                ERROR_NAME: name,
                ERROR_KIND: kind,
                ERROR_TYPE: type,
            };

            // Log the error for debugging purposes
            console.error(errorObject);
        }
    })


});








const port = process.env.PORT;
httpServer.listen(port, () => {
    console.log(`http server running on port: ${port}`);
})
