var express = require('express');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/votel');

var port = process.env.PORT || 8080;

app.listen(port);
console.log('Listening on port ' + port);

