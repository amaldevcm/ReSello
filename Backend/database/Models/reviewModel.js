const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    itemId: Object,
    reviewerId: Object,
    rating: Number,
    comments: String,
    createdDate: String,
    status: {
        type: String,
        required: false,
        default: 'Active'
    },
});

const reviewModel = new mongoose.model('Reviews', reviewSchema);
module.exports = reviewModel;