const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    buyerId: Object,
    sellerId: Object,
    itemId: Object,
    price: Number,
    createdDate: String,
    status: {
        type: String,
        required: false,
        default: 'Active'
    },
});

const orderModel = new mongoose.model('Orders', orderSchema);
module.exports = orderModel;