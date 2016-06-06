var express = require('express');
var mongoose = require('mongoose');
var config = require('./config');
var apiController = require('./controllers/apiController');

var app = express();

//app.use('/public', express.static(__dirname + '/public'));

mongoose.connect(config.getDbConnectionString());

var port = process.env.PORT || 8080;

apiController(app);

app.listen(port);
console.log('Listening on port ' + port);

