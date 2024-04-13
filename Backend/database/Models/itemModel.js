const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    id: Number,
    creatorId: Number,
    name: String,
    type: String,
    cost: Number,
    selling: Number,
    stock: Number,
    createdDate: String,
    updatedDate: String,
    mainImage: String,
    status: {
        type: String,
        required: false,
        default: 'Active'
    },
    description: String,
    discount: {
        type: Number,
        default: 0,
        required: false
    },
    colors: {
        default: {
            color: '#fff',
            colorName: 'white',
            images: []
        },
        type: [],
        required: false
    }
});

const Item = new mongoose.model('Items', itemSchema);
module.exports = Item;