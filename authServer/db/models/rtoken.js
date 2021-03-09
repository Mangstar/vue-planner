const mongoose = require('mongoose');

const RToken = new mongoose.Schema({
  token: {
    type: String,
    required: true
  },

  userId: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: new Date
  },

  expiresIn: {
    type: Number,
    default: 28800000 // 8h
  }
});

module.exports = mongoose.model('RToken', RToken);