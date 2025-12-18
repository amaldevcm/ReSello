const mongoose = require('mongoose');

const categoryModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    createdDate: {
        type: Date,
        required: false
    }
})

const category = new mongoose.model('category', categoryModel);
module.exports = category;