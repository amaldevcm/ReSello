const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    mobile: Number,
    password: String,
    address: String,
    status: {
        type: String,
        required: false,
        default: 'Active'
    },
    createdDate: String,
    updatedDate: String,
    role: {
        type: 'string',
        default: 'user',
        required: false
    }
});

const user = new mongoose.model('User', userSchema);
module.exports = user;