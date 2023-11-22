const mongoose = require('mongoose');

const User = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: false, default: false },
  fullname: { type: String, required: true },
  group: { type: String, required: true },
  phone: { type: String, required: true },
  faculty: { type: String, required: true },
  city: { type: String, required: true },
})

module.exports =  mongoose.model('User', User);
