var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var voteSchema = new Schema({
	text: String,
	value: Boolean
})

var Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote