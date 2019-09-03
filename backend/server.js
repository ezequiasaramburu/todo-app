const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const config = require('./config/config.js');
const mongoose = require('mongoose');
const Todos = require('./todos/router.js');

mongoose.Promise = global.Promise;
autoIncrement = require('mongoose-auto-increment');

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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderPath = `./public/assets/img`;
    try {
      fs.mkdirSync(folderPath, { recursive: true })
    } catch (err) {
      if (err.code !== 'EEXIST') throw err
    }
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname )
  }
});
const uploadFile = multer({ storage: storage }).single('file');

app.post('/upload',function(req, res) {
  uploadFile(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
    } else if (err) {
        return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  })
});

app.listen(config.serverPort.PORT, function() {
	console.log('Server is running on Port: ' + config.serverPort.PORT);
});