const express = require('express');
const router = express.Router();
const itemModel = require('../database/Models/itemModel');
const moment = require('moment')

router.get('/', (req, res)=> {
    itemModel.find().then(result => {
        res.status(200).send({items: result});
    });
});

router.get('/:id', (req, res)=> {
    console.log(req.params.id);
    itemModel.find({id: req.params.id}).then(result => {
        res.status(200).send({items: result});
    });
});

router.post('/', (req, res) => {
    if(req && req.body !== undefined) {
        itemModel.find().then(result => {
            let data = req.body.item;
            data.id = result.length +1;
            data.createdDate = moment().toDate().toISOString();
            data.status = 'Active'; 
            let item = new itemModel(data);
            item.save().then(r => {
                res.status(200).send({msg: "Item saved", status: "Success"});
            }).catch(err => res.status(400).send({status: "Error", msg: "Item not saved"}));
        });
    }
});

router.put('/', (req, res) => {
    if(req && req.body !== undefined) {
        let data = req.body.item;
        data.updatedDate = moment().toDate().toISOString();
        itemModel.updateOne({id: data.id}, data).then(r => {
            res.status(200).send({msg: "Item Updated", status: "Success"});
        }).catch(err => res.status(400).send({status: "Error", msg: "Item not saved"}));
    }
});

module.exports = router;