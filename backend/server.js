const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/config.js');
const mongoose = require('mongoose');
const Todos = require('./todos/router.js');

mongoose.Promise = global.Promise;
autoIncrement = require('mongoose-auto-increment');

app.use(cors());

app.use(bodyParser.json());

mongoose.set('useCreateIndex', true);
const connection = mongoose.createConnection(config.connection.uri);

connection.once('open', function() {
    console.log('MongoDB database connection established successfully');
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Router
app.use('/todos', Todos);

app.listen(config.serverPort.PORT, function() {
	console.log('Server is running on Port: ' + config.serverPort.PORT);
});