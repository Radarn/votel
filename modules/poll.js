var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var pollSchema = new Schema({
	name: String,
	alternatives: Object,
	kind: String,
	date: {
	  type: Date,
	  default: Date.now
	}
})

var Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll