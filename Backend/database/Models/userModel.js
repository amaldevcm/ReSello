const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: Number,
    password: String,
    address: String,
    zipcode: Number,
    status: {
        type: String,
        required: false,
        default: 'Active'
    },
    createdDate: String,
    updatedDate: String,
    role: {
        type: String,
        default: 'user',
        required: false
    },
    rating: Number
});

const user = new mongoose.model('User', userSchema);
module.exports = user;