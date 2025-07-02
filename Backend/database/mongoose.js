const mongoose = require('mongoose');

const uri = encodeURI('your db url');
mongoose.connect(uri)
        .then(() => {
            console.log('Database connected');
        })
        .catch(err => console.log(err));


module.exports = mongoose; 
