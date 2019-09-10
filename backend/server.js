const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const config = require('./config/config.js');
const mongoose = require('mongoose');
const Todos = require('./todos/router.js');

mongoose.Promise = global.Promise;

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
const connection = mongoose.createConnection(config.connection.uri);
mongoose.connect(config.connection.uri);

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

app.use(
  fileUpload({
    useTempFiles: true,
    safeFileNames: true,
    preserveExtension: true,
    tempFileDir: `${__dirname}/public/assets/`
  })
);

app.post('/upload', (req, res, next) => {
  let uploadFile = req.files.file;
  const name = uploadFile.name;
  uploadFile.mv(`${__dirname}/public/assets/${name}`, function(err) {
    if (err) {
      return res.status(500).json({ status: 'failed', err });
    }
    return res.status(200).json({ status: 'uploaded', name });
  });
});

app.listen(config.serverPort.PORT, function() {
	console.log('Server is running on Port: ' + config.serverPort.PORT);
});