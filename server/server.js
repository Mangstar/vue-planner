require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const getMongoConnection = require('./db/index');

const app = express();

const PORT = 3000;

const verifyToken = require('./verifyToken');

const allowlist = ['http://localhost:8080', 'http://localhost:3000', 'http://localhost:4000'];
const corsOptionsDelegate = function (req, callback) {
  let corsOptions = { credentials: true };

  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions.origin = true;
  } else {
    corsOptions.origin = false;
  }
  callback(null, corsOptions);
}

app.use(express.json());
app.use(cors(corsOptionsDelegate));
app.use(cookieParser());

app.get('/api/posts', verifyToken, async (req, res) => {
  res.send([{
    title: 'Post 1'
  }, {
    title: 'Post 2'
  }])
});

app.listen(PORT, async () => {
  await getMongoConnection();
});