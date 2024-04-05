const mongoose = require('mongoose');

const categoryModel = new mongoose.Schema({
    categoryId: number,
    categoryName: {
        type: string,
        required: true
    },
    status: boolean
})

const category = new mongoose.model(categoryModel, 'category');
module.exports = category;