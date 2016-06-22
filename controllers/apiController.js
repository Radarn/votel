var express = require('express');
var Poll = require('../modules/Poll');
var Vote = require('../modules/Vote')
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
		console.log(req.body)


		var title = req.body.title
		
		var options = req.body.options
		var kind = req.body.kind

		var newPoll = Poll({
			title: title,
			options: {name: req.body.options},
			kind: kind
		})
		
		Poll.create(newPoll, function(err, results) {
			console.log(results)
			res.send('Success ' + results)
		})

	})

	.get(function(req, res) {
		console.log(req.params.id)
       	Poll.find(function(err, polls) {
           	if (err)
            	res.send(err);

           	res.json(polls);
       	});
   	});

   		router.route('/polls/:id')

   		.post(function(req, res) {
   			console.log(req.body)


   			var title = req.body.title
   			
   			var options = req.body.options
   			var kind = req.body.kind

   			var newPoll = Poll({
   				title: title,
   				options: {name: req.body.options},
   				kind: kind
   			})
   			
   			Poll.create(newPoll, function(err, results) {
   				console.log(results)
   				res.send('Success ' + results)
   			})

   		})

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

   		.post(function(req, res) {
   			console.log(req.body)


   			var title = req.body.title
   			
   			var options = req.body.options
   			var kind = req.body.kind

   			var newPoll = Poll({
   				title: title,
   				options: {name: req.body.options},
   				kind: kind
   			})
   			
   			Poll.create(newPoll, function(err, results) {
   				console.log(results)
   				res.send('Success ' + results)
   			})

   		})

   		.get(function(req, res) {
   			var kind = req.params.kind;
   	       	Poll.find({kind: kind}, function(err, poll) {
   	           	if (err)
   	            	res.send(err);

   	           	res.json(poll);
   	       	});
   	   	});

	router.route('/votes')

	.post(function(req, res) {
		var name = req.body.name
		var options = req.body.options
		var kind = req.body.kind

		var Vote = Poll({
			name: name,
			options: options,
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