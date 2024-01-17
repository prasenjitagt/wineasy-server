const express = require('express');
const app = express();

//dot env calling
require('dotenv').config();


//middlewears
const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const router = require('./routes/routes');
app.use('/api', router);



const port = process.env.PORT;
app.listen(port, () => {
    console.log(`server running on port: ${port}`);
})