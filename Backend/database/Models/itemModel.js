const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    id: Number,
    name: String,
    type: String,
    cost: Number,
    selling: Number,
    stock: Number,
    createdDate: String,
    updatedDate: String,
    image: String,
    status: {
        type: String,
        required: false,
        default: 'Active'
    },
    description: String
});

const Item = new mongoose.model('Items', itemSchema);
module.exports = Item;