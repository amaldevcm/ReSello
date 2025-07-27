const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: Number,
    password: String,
    address: String,
    zipcode: Number,
    bio: String,
    status: {
        type: String,
        required: false,
        default: 'Active'
    },
    createdDate: String,
    updatedDate: String,
    role: {
        type: String,
        default: 'user',
        required: false
    },
    rating: Number
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) 
    return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const user = new mongoose.model('User', userSchema);
module.exports = user;