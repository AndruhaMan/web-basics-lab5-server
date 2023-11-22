const express = require('express');
const router = require('./router.js');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', router);

async function start () {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(PORT, () => console.log('Using port: ' + PORT));
  } catch (e) {
    console.log(e);
  }
}

start();