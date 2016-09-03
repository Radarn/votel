'use strict';

myApp.controller('createCtrl', ['$scope', 'HttpFactory', '$location', function($scope, HttpFactory, $location) {
	var vm = this;
	
	
	vm.addPoll = addPoll;
	vm.addChoice = addChoice;
	vm.addTitle = addTitle;
	vm.addKind = addKind;

	activate()

	function activate() {
		vm.choiceId = 0;
		vm.buttonState = false;
		vm.title = '';
		vm.kind = '';
		vm.numberOfOptions = []
		vm.kinds = [
			"food",
			"music",
			"movies",
			"games"
		]
		vm.optionsId = 0
		vm.pollData = {
			question: '',
			choices: [],
			kind: ''
		}
	};

	function addTitle() {
		vm.pollData.question = vm.poll.title;
		vm.title = vm.poll.title;

		if(vm.title.length > 0) {
			vm.buttonState = true;
			$('#add-title').html('Change title');
			console.log(vm.pollData)

		} else {
			vm.buttonState = false;
		}
	};

	function addChoice() {
		vm.pollData.choices.push({'choiceTitle': vm.poll.choice, 'voteScore': 0, 'choiceId': vm.choiceId});
		vm.choiceId += 1;
		console.log(vm.pollData);
		$('#choice').val('');
	};

	function addKind() {
		vm.pollData.kind = vm.poll.kind;
		vm.kind = vm.poll.kind;
	};

	function addPoll(newPoll) {	
		vm.pollInfo = {
			data: vm.pollData,
			url: "/api/polls/"
		}
		console.log(vm.pollInfo)
		HttpFactory.post(vm.pollInfo).then(function(res) {
			console.log(res)
			$location.url(['/poll-list/' + newPoll.kind])
		})
	};
}]);