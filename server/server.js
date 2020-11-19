require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const getMongoConnection = require('./db/index');

const app = express();

const PORT = 3000;

const authRoutes = require('./routes/auth');
const verifyToken = require('./verifyToken');

app.use(express.json());
app.use(cors());

// console.log(authRoutes);

require('./routes/auth');

app.get('/api/posts', verifyToken, async (req, res) => {
  res.send([{
    title: 'Post 1'
  }, {
    title: 'Post 2'
  }])
});

app.use('/auth', authRoutes);

app.listen(PORT, async () => {
  await getMongoConnection();
});