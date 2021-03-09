const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    min: 6,
    max: 30
  },

  email: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  password: {
    type: String,
    min: 6,
    max: 30
  }
});

module.exports = mongoose.model('User', UserSchema);