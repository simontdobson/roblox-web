const express = require('express');
const robloxLog = require('./roblox-log');
const robloxConfig = require('./roblox-config');
const robloxStatus = require('./roblox-status');
const lockScreen = require('./lockScreen');
const path = require('path');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

// place holder for the data
const users = [];

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/build')));

app.get('/api/robloxLog', (req, res) => {
  console.log('api/robloxLog called!')
  robloxLog(res);
});

app.get('/api/robloxConfig', (req, res) => {
  console.log('api/robloxConfig called!')
  robloxConfig.getAllowances(res);
});

app.post('/api/robloxConfig', (req,res) => {
//  const property = req.body.property;
//  const value = req.body.value;
  console.log('post api/robloxConfig req.body=' + JSON.stringify(req.body));
  payload = req.body.payload;
  robloxConfig.setAllowance(payload,res);
//  res.json('ok');
});

app.get('/api/robloxStatus', (req, res) => {
  console.log('api/robloxStatus called!')
  robloxStatus(res);
});

app.get('/api/lockScreen', (req, res) => {
 // const user = req.body.user;
  console.log('lockScreen called');
  lockScreen(res);
});

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});