var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var pollSchema = new Schema({
	name: String,
	firstRequiredOption: String,
	secondRequiredOption: String,
	options: Object,
	kind: String,
	date: {
	  type: Date,
	  default: Date.now
	}
})

var Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll