const express = require('express');
const router = express.Router();
const categoryModel = require('../database/Models/categoryModel');

router.get('/', (req, res) => {
    categoryModel.find().then(result => {
        res.send(result);
    }).catch(err => { res.status(400).send({status: "Error", msg: "No categories found!!!"})});
});


router.get('/:id', (req, res) => {
    let id = req.params.id;
    categoryModel.find({categoryId: id}).then(result => {
        res.send(result);
    }).catch(err => { res.status(400).send({status: "Error", msg: "No category found!!!"})});
});

router.post('/', (req, res) => {
    if(req && req.body !== undefined) {
        categoryModel.find().then(result => {
            let data = req.body.item;
            data.categoryId = result.length +1;
            data.createdDate = moment().toDate().toISOString();
            data.status = 'Active'; 
            let category = new categoryModel(data);
            category.save().then(r => {
                res.status(200).send({msg: "Category created successfully!!!", status: "Success"});
            }).catch(err => res.status(400).send({status: "Error", msg: "Category not created :("}));
        });
    }
});