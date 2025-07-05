const mongoose = require('mongoose');

const categoryModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    defaultIcon: String,
    status: Boolean
})

const category = new mongoose.model(categoryModel, 'category');
module.exports = category;