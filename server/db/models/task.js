const mongoose = require('mongoose');

const Task = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  body: {
    type: String,
    required: true
  },

  userId: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Task', Task);