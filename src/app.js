// app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors({
  origin: ['http://localhost:8081','exp://127.0.0.1:19000'], 
  methods: ['GET','POST','OPTIONS'],
  credentials: true
}));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

app.get('/', (req, res) => {
  res.send('AIParty backend está activo.');
});

module.exports = app;
