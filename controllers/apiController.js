var express = require('express');
var Poll = require('../modules/Poll');
var Vote = require('../modules/Vote')
var bodyParser = require('body-parser');

module.exports = function(app) {

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	var router = express.Router();

	router.use(function(req, res, next) {
	    console.log('Method passed to server: ' + req.method);
	    next();
	});

	router.route('/polls')

	.post(function(req, res) {
		var name = req.body.name
		var alternatives = req.body.alternatives
		var kind = req.body.kind

		var newPoll = Poll({
			name: name,
			alternatives: alternatives,
			kind: kind
		})
		
		Poll.create(newPoll, function(err, results) {
			console.log(results)
			res.send('Success ' + results)
		})

	})

	.get(function(req, res) {
       	Poll.find(function(err, polls) {
           	if (err)
            	res.send(err);

           	res.json(polls);
       	});
   	});

	router.route('/votes')

	.post(function(req, res) {
		var name = req.body.name
		var alternatives = req.body.alternatives
		var kind = req.body.kind

		var newPoll = Poll({
			name: name,
			alternatives: alternatives,
			kind: kind
		})
		
		Poll.create(newPoll, function(err, results) {
			console.log(results)
			res.send('Success ' + results)
		})
	})

	.get(function(req, res) {
       	Vote.find(function(err, votes) {
           	if (err)
            	res.send(err);

           	res.json(votes);
       	});
   	});

	app.use('/api', router);
}