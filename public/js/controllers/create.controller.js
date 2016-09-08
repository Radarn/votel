'use strict';

myApp.controller('createCtrl', ['$scope', 'HttpFactory', '$location', function($scope, HttpFactory, $location) {
	var vm = this;
	
	
	vm.addPoll = addPoll;
	vm.addChoice = addChoice;
	vm.addTitle = addTitle;
	vm.addKind = addKind;
	vm.toggleTitleButtonState = toggleTitleButtonState;
	vm.anotherOption = anotherOption;
	vm.submitOption = submitOption;

	activate()

	function activate() {
		$('.dropdown-toggle').dropdown()
		vm.choiceId = 0;
		vm.buttonState = false;
		vm.title = 'Add Title';
		vm.kind = 'Add Category';
		vm.numberOfOptions = []
		vm.kinds = [
			"Food",
			"Music",
			"Movies",
			"Games"
		]
		vm.optionsId = 0
		vm.pollData = {
			question: '',
			choices: [],
			kind: ''
		}
	};

	function toggleTitleButtonState() {
		if (vm.buttonState === false) {
			vm.buttonState = true;
		} else {
			vm.buttonState = false;
			addTitle();
		}
	};

	function addTitle() {
		vm.pollData.question = vm.poll.title;
		vm.title = vm.poll.title;
	};

	function anotherOption() {
		vm.pollData.choices.push({'show': false, 'voteScore': 0, 'choiceId': vm.choiceId})
		vm.choiceId += 1;
	};

	function submitOption(index, model) {
		vm.pollData.choices[index].choiceTitle = model;
		vm.pollData.choices[index].show = true;
	};	

	function addChoice() {
		vm.pollData.choices.push({'choiceTitle': vm.poll.choice, 'voteScore': 0, 'choiceId': vm.choiceId});
		vm.choiceId += 1;
		console.log(vm.pollData);
		$('#choice').val('');
	};

	function addKind(kind) {
		console.log(kind)
		vm.pollData.kind = kind.toLowerCase();
		vm.kind = kind;
	};

	function addPoll(newPoll) {	
		vm.pollInfo = {
			data: vm.pollData,
			url: "/api/polls/"
		}
		console.log(vm.pollInfo)
		HttpFactory.post(vm.pollInfo).then(function(res) {
			console.log(res)
			$location.url(['/poll-list/' + vm.kind.toLowerCase()])
		})
	};
}]);