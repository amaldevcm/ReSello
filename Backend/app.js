const express = require('express');
const cors = require('cors');
const mongoose = require('./database/mongoose')
const app = new express();
const moment = require('moment');
const dotenv = require('dotenv');
const AWS = require("aws-sdk");
const auth = require('./Middleware/auth');

dotenv.config();
app.use(cors());
app.use(express.json());

const userRoute = require('./Routes/userRoutes');
const itemRoute = require('./Routes/itemRoutes');

// Item data processing
app.use('/api/items', itemRoute);

// User data processing
app.use('/api/users', userRoute);

const s3 = new AWS.S3({
    region: "us-east-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    signatureVersion: "v4"
});

//  AWS connections
app.get('/api/presignedUrl', auth, (req, res) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${Date.now()}-${req.query.filename}`,
        Expires: 60,
        ContentType: req.query.filetype,
        ACL: "public-read",
    };

    s3.getSignedUrl("putObject", params, (err, url) => {
        if (err) {
            console.log(err);
            res.status(400).send({ status: "Error", msg: "Error fetching AWS url" });
        } else {
            res.json({ url, key: params.Key });
        }
    });
});

app.get('/api/getImgUrl', auth, (req, res) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.query.imgKey,
        Expires: 60,
    }

    s3.getSignedUrl("getObject", params, (err, url) => {
        if (err) {
            console.log(err);
            res.status(400).send({ status: "Error", msg: "Error fetching AWS url" });
        } else {
            res.json({ url: url });
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Listening to localhost: 3000");
});
