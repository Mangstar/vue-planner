const mongoose = require('mongoose');

const RToken = new mongoose.Schema({
  token: {
    type: String,
    required: true
  },

  userId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('RToken', RToken);