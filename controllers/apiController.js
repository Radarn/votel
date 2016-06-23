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

	router.route('/polls')

	.post(function(req, res) {
		console.log(req.body)


		var title = req.body.title
		
		var options = req.body.options
		var kind = req.body.kind

		var newPoll = Poll({
			title: title,
			options: options,
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

   	router.route('/polls/getDetailed')
   		.get(function(req, res) {
   			console.log(res.req.query)
   			var query = res.req.query
   			var queryString = ""

   			for (var i = 0; i < query.length; i++) {
   				queryString += query[i]
   				console.log(query[i])
   				console.log("HEJ")
   			}
   			
   	       	Poll.find(function(err, polls) {
   	           	if (err)
   	            	res.send(err);

   	           	res.json(polls);
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