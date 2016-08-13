var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var voteSchema = new Schema({
	name: String,
	votes: {
		type: Number,
		default: 0
	}
})

var Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote