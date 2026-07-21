const express = require('express');
const router = express.Router();
const itemModel = require('../database/Models/itemModel');
const orderModel = require('../database/Models/orderModel');
const moment = require('moment');
const auth = require('../Middleware/auth');

router.post('/', auth, (req, res) => {
    const itemId = req.body.itemId;
    if (!itemId) {
        return res.status(400).send({ status: "Error", msg: "Item id required" });
    }
    itemModel.findById(itemId).then(item => {
        if (!item) {
            return res.status(404).send({ status: "Error", msg: "Item not found" });
        }
        if (item.status === 'sold') {
            return res.status(400).send({ status: "Error", msg: "Item is already sold" });
        }
        if (item.userId.toString() === req.userId) {
            return res.status(400).send({ status: "Error", msg: "You cannot buy your own listing" });
        }

        let order = new orderModel({
            buyerId: req.userId,
            sellerId: item.userId,
            itemId: item._id,
            price: item.price,
            createdDate: moment().toDate().toISOString(),
        });

        order.save().then(() => {
            item.status = 'sold';
            item.updatedDate = moment().toDate().toISOString();
            item.save().then(() => {
                res.status(200).send({ msg: "Order placed", status: "Success" });
            }).catch(err => res.status(400).send({ status: "Error", msg: "Order placed but item could not be updated" }));
        }).catch(err => res.status(400).send({ status: "Error", msg: "Order not placed" }));
    }).catch(err => res.status(400).send({ status: "Error", msg: "Item not found" }));
});

module.exports = router;
