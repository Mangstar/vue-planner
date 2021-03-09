require('dotenv').config();

const express            = require('express');
const cors               = require('cors');
const cookieParser       = require('cookie-parser');
const getMongoConnection = require('./db/index');

const app = express();

const PORT = 4000;

const allowlist = ['http://localhost:8080', 'http://localhost:3000'];
const corsOptionsDelegate = function (req, callback) {
  let corsOptions = { credentials: true };

  corsOptions.origin = allowlist.includes(req.header('Origin'));

  callback(null, corsOptions);
}

app.use(express.json());
app.use(cors(corsOptionsDelegate));
app.use(cookieParser());

app.use('/', require('./routes/auth'));

app.listen(PORT, async () => {
  await getMongoConnection();
});