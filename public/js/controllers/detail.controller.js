'use strict';

myApp.controller('detailCtrl', ['HttpFactory', '$routeParams', function(HttpFactory, $routeParams) {
	var vm = this

	vm.getPoll = getPoll;
	vm.submitVote = submitVote;
	vm.showResult = showResult;
	vm.currentChoice = currentChoice;
	vm.countProgressBarWidth = countProgressBarWidth;

	activate()

	function activate() {
		vm.type = $routeParams.type;
		vm.pollId = $routeParams.id;
		vm.showProgressBar = false;
		vm.showVoteButton = true;
		vm.totalVoteScore = 0;
		vm.progressBarWidthArr = [];
		getPoll()
	};

	function getPoll() {
		var specificPoll = {
			url: "/api/polls/" + vm.pollId
		}
		HttpFactory.get(specificPoll).then(function(res) {
			vm.polls = res.data;
		});
	};

	function submitVote() {
		var updatedVote = {
			url: "/api/votes/update/" + vm.currentChoiceId +":"+ vm.pollId
		};
		HttpFactory.get(updatedVote).then(function(res) {
			vm.showVoteButton = false;
			showResult();
		});
	};

	function showResult() {
		var specificPoll = {
			url: "/api/polls/" + vm.pollId
		}
		HttpFactory.get(specificPoll).then(function(res) {
			vm.polls = res.data;
			vm.pollOptions = vm.polls[0].options;
			for (var i = 0; i < vm.pollOptions.length; i++) {
				vm.totalVoteScore += vm.pollOptions[i].voteScore
			}
	
			console.log(vm.totalVoteScore);
			vm.countProgressBarWidth();
		});
	};

	function currentChoice(voteOption) {
		vm.currentChoiceId = voteOption.choiceId;
	};

	function countProgressBarWidth() {
		for (var i = 0; i < vm.pollOptions.length; i++) {
			var count = vm.pollOptions[i].voteScore / vm.totalVoteScore;
			count *= 100
			vm.progressBarWidthArr.push(count)
		}
		vm.showProgressBar = true;
	};
	
}]);