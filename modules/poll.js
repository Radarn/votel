var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var voteSchema = new mongoose.Schema({ ip: 'String' });

var choiceSchema = new mongoose.Schema({ 
  name: String,
  votes: {
  	type: Number,
  	default: 0
  }
});

var pollSchema = new Schema({
	title: String,
	options: Array,
	kind: String,
	show: {
		type: Boolean,
		default: false
	},
	date: {
	  type: Date,
	  default: Date.now
	}

})



var Poll = mongoose.model('Poll', pollSchema);
var Choice = mongoose.model('Choice', choiceSchema);
module.exports = Choice;
module.exports = Poll;
