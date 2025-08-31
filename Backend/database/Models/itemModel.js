const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    userId: Object,
    name: String,
    category: String,
    description: String,
    price: Number,
    createdDate: String,
    updatedDate: String,
    image: String,
    status: {
        type: String,
        required: false,
        default: 'active'
    },
    buyerId: {
        type: Object,
        default: null,
    },
});

const Item = new mongoose.model('Items', itemSchema);
module.exports = Item;