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
		console.log(req.body.kind)


		var title = req.body.title
		
		var options = req.body.options
		var arr = []
		arr.push(options)
		console.log(arr)
		var kind = req.body.kind

		var newPoll = Poll({
			title: title,
			options: {"names": arr},
			kind: kind
		})

		
		
		Poll.create(newPoll, function(err, results) {
			console.log(results)
			res.send('Success ' + results)
		})

	})

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
       	})
   	})

   	.put(function(req, res) {
   		console.log("PUT")
   		var id = req.params.id
   		console.log(id)
   			Poll.update({"options._id" : id }, function(err, votes) {
   		    	if (err)
   		     	res.send(err);
   		     console.log("This is votes" + votes)
   		    	res.json(votes);
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

	router.route('/votes/:id')

	.put(function(req, res) {
		var id = req.params.id
		console.log(id)
			Poll.update({"options._id" : id }, function(err, votes) {
		    	if (err)
		     	res.send(err);
		     console.log("This is votes" + votes)
		    	res.json(votes);
			});
	})

	.get(function(req, res) {
		var id = req.params.id
		console.log("This is vote ID " + id)
       	Poll.find({"options._id" : id }, function(err, votes) {
           	if (err)
            	res.send(err);
            console.log("This is votes" + votes.options)
           	res.json(votes);
       	});
   	});

	app.use('/api', router);
}