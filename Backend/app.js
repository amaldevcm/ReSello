const express = require('express');
const cors = require('cors');
const mongoose = require('./database/mongoose')
const app = new express();
const moment = require('moment');

app.use(cors());
app.use(express.json()); 

const userRoute = require('./Routes/userRoutes');
const itemRoute = require('./Routes/itemRoutes');

// Item data processing
app.use('/api/items', itemRoute);

// User data processing
app.use('/api/users', userRoute);

// cart data processing

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Listening to localhost: 3000");
});
