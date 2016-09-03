var express = require('express');
var Poll = require('../modules/Poll');
var Choice = require('../modules/Poll')
var bodyParser = require('body-parser');
var cors = require('cors');

module.exports = function(app) {

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cors());

	var router = express.Router();

	router.use(function(req, res, next) {
	    console.log('Method passed to server: ' + req.method);
	    next();
	});

	router.route('/polls/')

	.post(function(req, res) {
		console.log(req.body.kind)
		console.log(req.body)

		var title = req.body.question;
		var kind = req.body.kind;
		var choices = req.body.choices;

		var newPoll = Poll({
			title: title,
			options: choices,
			kind: kind
		})

			
		Poll.create(newPoll, function(err, results) {
			console.log(results)
			res.send('Success ' + results)
		})

	});

   	router.route('/polls/:id')

	.get(function(req, res) {
		var id = req.params.id;
		console.log(id)
       	Poll.find({_id: id}, function(err, poll) {
           	if (err)
            	res.send(err);

           	res.json(poll);
       	});
   	});

	router.route('/getAllPolls/:kind')

	.get(function(req, res) {
		var kind = req.params.kind;
		console.log(kind)
       	Poll.find({kind: kind}, function(err, poll) {
           	if (err)
            	res.send(err);

           	res.json(poll);
       	});
   	});

   	router.route('/votes/update/:id')

	.get(function(req, res) {
		var params = req.params.id
		var choiceId = params.substring(0, 1)
		var pollId = params.substring(2)
		console.log(pollId)
		console.log("This is currentChoiceId " + choiceId)

		var number = 0;
		choiceId = parseInt(choiceId)
		var string = "options." + choiceId +  ".voteScore";
		var action = {};
		action[string] = 1;

		Poll.findOneAndUpdate({"_id": pollId}, {$inc: action}, function(err, votes) {
			if (err)
			 	res.send(err);
			 console.log(votes);
			 res.json(votes);
		})

   	});

	app.use('/api', router);
}