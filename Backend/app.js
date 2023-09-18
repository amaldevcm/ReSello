const express = require('express');
const cors = require('cors');
const mongoose = require('./database/mongoose')
const app = new express();
const moment = require('moment');

app.use(cors());
app.use(express.json()); 

const userModel = require('./database/Models/userModel');
const itemModel = require('./database/Models/itemModel');

// const userRouter = express.Router('/api/user');
// const itemRouter = express.Router('/api/item');

// Item data processing
app.get('/api/items', (req, res)=> {
    itemModel.find().then(result => {
        res.status(200).send({items: result});
    });
});

app.get('/api/items/:id', (req, res)=> {
    console.log(req.params.id);
    itemModel.find({id: req.params.id}).then(result => {
        res.status(200).send({items: result});
    });
});

app.post('/api/items', (req, res) => {
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

app.put('/api/items', (req, res) => {
    if(req && req.body !== undefined) {
        let data = req.body.item;
        data.updatedDate = moment().toDate().toISOString();
        itemModel.updateOne({id: data.id}, data).then(r => {
            res.status(200).send({msg: "Item Updated", status: "Success"});
        }).catch(err => res.status(400).send({status: "Error", msg: "Item not saved"}));
    }
});


// User data processing
app.get('/api/users', (req, res)=> {
    userModel.find().then(result => {
        res.status(200).send({users: result});
    });
});

app.get('/api/users/:id', (req, res)=> {
    userModel.find({id: req.params.id}).then(result => {
        res.status(200).send({user: result});
    });
});

app.post('/api/users', (req, res) => {
    if(req && req.body !== undefined) {
        userModel.find().then(result => {
            let data = req.body.user;
            data.id = result.length +1; 
            data.createdDate = moment().toDate().toISOString();
            data.status = 'Active';
            let user = new userModel(data);
            user.save().then(r => {
                res.status(200).send({msg: "User saved", status: "Success"});
            }).catch(err => res.status(400).send({status: "Error", msg: "User not saved"}));
        });
    }
});

app.put('/api/users', (req, res) => {
    if(req && req.body !== undefined) {
        let data = req.body.user;
        data.updatedDate = moment().toDate().toISOString();
        userModel.updateOne({id: data.id}, data).then(r => {
            res.status(200).send({msg: "User Updated", status: "Success"});
        }).catch(err => res.status(400).send({status: "Error", msg: "User not saved"}));
    }
});

// cart data processing



app.listen(3000,() => {
    console.log("Listening to localhost: 3000");
});