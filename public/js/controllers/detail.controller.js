'use strict';

myApp.controller('detailCtrl', ['HttpFactory', '$routeParams', function(HttpFactory, $routeParams) {
	var vm = this

	vm.getPoll = getPoll;
	vm.isChecked = isChecked;
	vm.submitVote = submitVote;
	vm.showResult = showResult;
	vm.currentChoice = currentChoice;
	vm.countProgressBarWidth = countProgressBarWidth;

	activate()

	function activate() {
		vm.type = $routeParams.type;
		vm.pollId = $routeParams.id;
		vm.showProgressBar = false;
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
			console.log("VoteScore " + vm.pollOptions[i].voteScore)
			var count = vm.pollOptions[i].voteScore / vm.totalVoteScore;
			count *= 100
			console.log("count " + count)
			vm.progressBarWidthArr.push(count)
		}
		console.log(vm.progressBarWidthArr);
		vm.showProgressBar = true;
	};
	
}]);