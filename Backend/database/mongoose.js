const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const uri = encodeURI(process.env.DB_URL);
mongoose.connect(uri)
        .then(() => {
            console.log('Database connected');
        })
        .catch(err => console.log(err));


module.exports = mongoose; 
