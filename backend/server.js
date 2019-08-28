const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/config.js');
const mongoose = require('mongoose');
console.log(config);
app.use(cors());

app.use(bodyParser.json());

mongoose.connect(config.connection.uri, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log('MongoDB database connection established successfully');
})

app.listen(config.serverPort.PORT, function() {
    console.log('Server is running on Port: ' + config.serverPort.PORT);
});