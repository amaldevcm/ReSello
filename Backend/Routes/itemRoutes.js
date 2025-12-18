const express = require('express');
const router = express.Router();
const itemModel = require('../database/Models/itemModel');
const moment = require('moment');
const auth = require('../Middleware/auth');

router.get('/', (req, res) => {
    const id = req.query.id;
    if (id) {
        itemModel.find({ _id: req.params.id }).then(result => {
            res.status(200).send({ items: result });
        });
    } else {
        itemModel.find().then(result => {
            res.status(200).send({ items: result });
        });
    }
});

router.post('/', auth, (req, res) => {
    if (req && req.body !== undefined) {
        itemModel.find().then(result => {
            let data = req.body.item;
            data.createdDate = moment().toDate().toISOString();
            data.status = 'Active';
            let item = new itemModel(data);
            item.save().then(r => {
                res.status(200).send({ msg: "Item saved", status: "Success" });
            }).catch(err => res.status(400).send({ status: "Error", msg: "Item not saved" }));
        });
    }
});

router.put('/', auth, (req, res) => {
    if (req && req.body !== undefined) {
        let data = req.body.item;
        data.updatedDate = moment().toDate().toISOString();
        itemModel.updateOne({ _id: data._id }, data).then(r => {
            res.status(200).send({ msg: "Item Updated", status: "Success" });
        }).catch(err => res.status(400).send({ status: "Error", msg: "Item not saved" }));
    }
});

router.get('/listing', auth, (req, res) => {
    const id = req.query.id
    if (id) {
        itemModel.find({ userId: id }).then(result => {
            const analytics = {
                totalPending: 0,
                totalSales: 0,
                totalPending: 0
            };

            result.forEach(item => {
                if (item.status = 'sold') {
                    analytics['totalProfit'] += item.price;
                    analytics['totalSales'] += 1;
                } else {
                    analytics['totalPending'] += 1;
                }
            });
            res.json({ items: result, analytics: analytics })
        });
    } else {
        res.status(400).json({ error: 'Invalid userId' });
    }
});

module.exports = router;