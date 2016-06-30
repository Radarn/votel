var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var voteSchema = new mongoose.Schema({ ip: 'String' });

var choiceSchema = new mongoose.Schema({ 
  names: Array,
  votes: {
  	type: Number,
  	default: 0
  }
});

var pollSchema = new Schema({
	title: String,
	options: [choiceSchema],
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

module.exports = Poll

/*var mongoose = require('mongoose');
var voteSchema = new mongoose.Schema({ ip: 'String' });
var choiceSchema = new mongoose.Schema({ 
  text: String,
  votes: [voteSchema]
});
module.exports.PollSchema = new mongoose.Schema({
  question: { type: String, required: true },
  choices: [choiceSchema]
});*/