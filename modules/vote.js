var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var voteSchema = new Schema({
	value: Boolean,
	date: {
	  type: Date,
	  default: Date.now
	}
})

var Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote