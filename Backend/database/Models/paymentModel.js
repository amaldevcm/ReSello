const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    orderId: Object,
    paymentProvider: String,
    paymentStatus: String,
    transactionId: String,
    createdDate: String,
});

const paymentModel = new mongoose.model('Payments', paymentSchema);
module.exports = paymentModel;