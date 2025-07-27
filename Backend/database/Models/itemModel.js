const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    userId: Object,
    name: String,
    category: String,
    description: String,
    price: Number,
    createdDate: String,
    updatedDate: String,
    images: Array,
    status: {
        type: String,
        required: false,
        default: 'active'
    },
    buyerId: Object,
});

const Item = new mongoose.model('Items', itemSchema);
module.exports = Item;