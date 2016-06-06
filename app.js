var express = require('express');
var mongoose = require('mongoose');

var app = express();

app.use('/public', express.static(__dirname + '/public'));

//app.set('view engine', 'jade');

mongoose.connect('mongodb://localhost/votel');

var port = process.env.PORT || 8080;

app.listen(port);
console.log('Listening on port ' + port);

