const express = require('express');
const router = express.Router();
const userModel = require('../database/Models/userModel');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const auth = require('../Middleware/auth');
const bcrypt = require('bcrypt');

router.get('/', auth, (req, res)=> {
    userModel.find().then(result => {
        res.status(200).send({users: result});
    });
});

router.get('/:id', auth, (req, res)=> {
    userModel.find({_id: req.params.id}).then(result => {
        res.status(200).send({user: result});
    });
});

router.post('/', auth, (req, res) => {
    if(req && req.body !== undefined) {
        userModel.find().then(result => {
            let data = req.body.user;
            data.createdDate = moment().toDate().toISOString();
            data.status = 'Active';
            let user = new userModel(data);
            user.save().then(r => {
                res.status(200).send({msg: "User saved", status: "Success"});
            }).catch(err => res.status(400).send({status: "Error", msg: "User not saved"}));
        });
    }
});

router.put('/', auth, (req, res) => {
    if(req && req.body !== undefined) {
        let data = req.body.user;
        data.updatedDate = moment().toDate().toISOString();
        userModel.updateOne({_id: data.id}, data).then(r => {
            res.status(200).send({msg: "User Updated", status: "Success"});
        }).catch(err => res.status(400).send({status: "Error", msg: "User not saved"}));
    }
});

router.post('/register', async (req, res) => {
    try {
        req.body.createdDate = moment().toDate().toISOString();
        req.body.updatedDate = moment().toDate().toISOString();
        const user = await userModel.create(req.body);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Filtering relevent data for client
        const data = {... user}
        delete data.createdDate;
        delete data.updatedDate;
        delete data.password;
        delete data.status;

        res.json({ token: token, user: user});
    } catch (err) {
        res.status(400).json({ error: 'SignUp failed' });
    }
});

router.post('/login', async(req, res) => {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Filtering relevent data for client
    const data = {... user}
    delete data.createdDate;
    delete data.updatedDate;
    delete data.password;
    delete data.status;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token: token, user: user});
});

module.exports = router;