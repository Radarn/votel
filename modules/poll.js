var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var pollSchema = new Schema({
	title: String,
	options: Array,
	kind: String,
	date: {
	  type: Date,
	  default: Date.now
	}

});



var Poll = mongoose.model('Poll', pollSchema);
module.exports = Poll;
