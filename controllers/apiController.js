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
		
		/*var options = req.body.options
		var option = options[0];
		var option2 = options[1];
		var arr = []
		arr.push(options)
		var kind = req.body.kind*/

		var newPoll = Poll({
			title: title,
			options: choices,
			kind: kind
		})

			
		Poll.create(newPoll, function(err, results) {
			console.log(results)
			res.send('Success ' + results)
		})

	})

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

	router.route('/votes/:id')

	.get(function(req, res) {
		var id = req.params.id
		console.log("This is vote ID " + id)
		// HERE I WILL NEED TO AGGREGATE !
       	Poll.find({"options.choiceTitle" : id }, function(err, votes) {
           	if (err)
            	res.send(err);
            console.log("This is votes" + votes)
           	res.json(votes);
       	});
   	});

   	router.route('/votes/update/:id')

   		.get(function(req, res) {
   			var id = req.params.id
   			console.log("This is vote ID " + id)
   	       	Choice.findOneAndUpdate({"options.choiceTitle" : id }, {$inc: {"votesScore": 1}}, function(err, votes) {
   	           	if (err)
   	            	res.send(err);
   	            console.log(votes)
   	            res.json(votes);
   	           	
   	       	});

   	   	});

	app.use('/api', router);
}