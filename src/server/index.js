const dotenv = require('dotenv');
dotenv.config();
var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');

const app = express();
app.use(express.json({ limit: '1mb' }));

let data = [];

app.use(express.static('dist'));

console.log(__dirname);

app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
});

// designates what port the app will listen to for incoming requests
app.listen(9002, function () {
  console.log('Example app listening on port 9002!');
});

app.get('/api', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9001');
  res.send({
    key: process.env.API_KEY,
    username: process.env.GEONAME_USERNAME,
    weatherKey: process.env.WEATHERBIT_KEY,
    unsplashKey: process.env.UNSPLASH_KEY,
  });
});

app.post('/data', (req, res) => {
  let newData = req.body;
  data.push(newData);
  console.log(data);
  res.send(data);
});

app.get('/data', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9001');
  res.send(data);
  console.log(req);
});
