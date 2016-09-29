'use strict';

var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(["$routeProvider", function ($routeProvider) {

	$routeProvider

	.when("/", {
		templateUrl: "landing.html",
		controller: "dashboardCtrl",
		controllerAs: "vm"
	})

	.when("/poll-list/:type", {
		templateUrl: "poll-list.html",
		controller: "listCtrl",
		controllerAs: "vm"
	})

	.when("/poll-detail/:id", {
		templateUrl: "poll-detail.html",
		controller: "detailCtrl",
		controllerAs: "vm"
	})

	.when("/create-poll", {
		templateUrl: "create-poll.html",
		controller: "createCtrl",
		controllerAs: "vm"
	})

	.otherwise( {redirectTo: '/'});
}]);






angular.module('myApp').run(['$templateCache', function($templateCache) {$templateCache.put('create-poll.html','<!-- NEED TO CREATE DIRECTIVES FOR THIS -->\n<form class="create-poll-form">\n    <div class="row">\n        <div class="form-group col-sm-4 col-sm-offset-4">\n            <button id="add-title" type="button" class="btn btn-default create-poll-edit-button" ng-class="{\'is-hidden\': vm.buttonState}" ng-click="vm.toggleTitleButtonState()">{{vm.title}}</button>\n        </div>\n        <div class="form-group col-sm-4 col-sm-offset-4">\n            <input type="text" class="form-control" placeholder="{{vm.title}}" ng-class="{\'is-hidden\': !vm.buttonState}" ng-blur="vm.toggleTitleButtonState()" ng-model="vm.poll.title">\n        </div>\n    </div>\n    <div class="row">\n        <div class="form-group col-sm-4 col-sm-offset-4 text-center">\n            <label>Add options!</label>\n        </div>\n        <div class="form-group col-sm-4 col-sm-offset-4 text-center">\n            <button type="button" class="btn btn-default add-options-button" aria-label="Left Align" ng-click="vm.anotherOption()">\n                <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>\n            </button>\n        </div>\n    </div>\n    <div ng-repeat="choice in vm.pollData.choices track by $index">\n        <div class="row" id="choices-row">\n            <div class="form-group col-sm-4 col-sm-offset-4">\n               <input type="text" class="form-control" ng-blur="vm.submitOption($index, vm.poll.choice[$index])" ng-class="{\'is-hidden\': vm.pollData.choices[$index].show}" ng-model="vm.poll.choice[$index]">\n               <button type="button" class="btn btn-default create-poll-edit-button" ng-class="{\'is-hidden\': !vm.pollData.choices[$index].show}" ng-click="vm.pollData.choices[$index].show = !vm.pollData.choices[$index].show"><span class="choice-number">{{$index}}.</span>{{vm.pollData.choices[$index].choiceTitle}}</button>\n            </div>\n        </div>\n    </div>\n    <div class="row">\n        <div class="form-group col-sm-4 col-sm-offset-4 dropdown">\n            <button type="button" class="btn btn-default create-poll-edit-button dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{vm.kind}}<span class="caret"></span></button>\n            <ul class="dropdown-menu kind-list" aria-labelledby="dLabel">\n                <li ng-repeat="kind in vm.kinds"><a type="button" class="btn btn-default" ng-click="vm.addKind(kind)">{{kind}}</a></li>\n            </ul>\n        </div>\n    </div>\n    <div class="row">\n        <div class="form-group col-sm-4 col-sm-offset-4">\n            <button type="submit" class="btn btn-success btn-lg create-poll-button" ng-click="vm.addPoll(vm.poll)">Create poll</button>\n        </div>\n    </div>\n</form>');
$templateCache.put('landing.html','\n<div class="page-header" style="height:200px;">\n\t<h1>VOTEL</h1>\n\t<h3>Vote for your favorite!</h3>\n</div>\n<div class="row">\n\t<div class="col-sm-3">\n\t\t<a href="#/poll-list/food" class="thumbnail">\n\t      \t<img src="public/img/foodicon.png" alt="food">\n\t    </a>\n\t</div>\n\t<div class="col-sm-3">\n\t\t<a href="#/poll-list/movies" class="thumbnail">\n\t\t    <img src="public/img/movieicon.png" alt="...">\n\t\t</a>\n\t</div>\n\t<div class="col-sm-3">\n\t\t<a href="#/poll-list/music" class="thumbnail">\n\t      \t<img src="public/img/musicicon.png" alt="...">\n\t    </a>\n\t</div>\n\t<div class="col-sm-3">\n\t\t<a href="#/poll-list/games" class="thumbnail">\n\t\t    <img src="public/img/videogame.jpeg" alt="...">\n\t\t</a>\n\t</div>\n</div>\n');
$templateCache.put('menu.html','<nav class="navbar navbar-default" style="height: 100px">\n  <div class="container-fluid">\n    <div class="navbar-header">\n      <a class="navbar-brand" href="#/" style="font-size: 2em;">\n        VOTEL\n      </a>\n    \t<a id="create-poll" type="button" class="btn btn-success btn-lg navbar-btn" href="#/create-poll">Create new poll</a>\n    </div>\n  </div>\n</nav>');
$templateCache.put('poll-detail.html','<div class="list-group">\n\t<div ng-repeat="poll in vm.polls">\n\t\t<div class="col-md-4"></div>\n\t    <div class="col-md-4">\n\t        <div class="panel panel-primary">\n\t            <div class="panel-heading">\n\t                <h3 class="panel-title"><span class="fa fa-line-chart"></span> {{vm.polls[0].title}} </h3>\n\t            </div>\n\t            <div class="panel-body">\n\t            \t<ul class="nav nav-pills nav-stacked">\n\t\t\t\t\t\t<div ng-repeat="options in poll.options track by $index">\n\t\t\t\t\t\t\t<div ng-hide="vm.showProgressBar">\n\t\t\t\t            \t<li><button class="btn btn-default detail-option" ng-click="vm.currentChoice(options)">{{options.choiceTitle}}</button></li>\n\t\t\t\t            </div>\n\t\t\t            \t<div ng-show="vm.showProgressBar">\n\t\t\t\t            \t<div class="progress">\n\t\t\t\t\t            \t<div class="progress-bar" role="progressbar" aria-valuenow="{{options.voteScore}}" aria-valuemin="0" aria-valuemax="{{vm.totalVoteScore}}" style="min-width: 2em; width: {{vm.progressBarWidthArr[$index]}}%;">\n\t\t\t\t            \t    {{options.choiceTitle}}{{options.voteScore}}\n\t\t\t\t            \t  </div>\n\t\t\t\t            \t</div>\n\t\t\t            \t</div>\n\t\t            \t</div>\n\t            \t</ul>\n\t            </div>\n\t            <div class="submit-vote-btn-container">\n\t\t            <button type="submit" ng-class="{\'is-hidden\': !vm.showVoteButton}" class="btn btn-success btn-lg submit-vote-btn" ng-click="vm.submitVote()">Vote!</button>\n\t\t            <h4 ng-class="{\'is-hidden\': vm.showVoteButton}">Thank you for your vote!</h4>\n\t            </div>\n\t        </div>\n\t    </div>\n\t\t\n\t</div>\n</div>');
$templateCache.put('poll-list.html','<div class="list-group">\n\t<h1 class="category-list-title"><span class = "label label-primary">{{vm.categoryTitle}}</span></h1>\n\t<div ng-repeat="poll in vm.polls">\n\t\t<a type="button" class="list-group-item" ng-href="#/poll-detail/{{poll._id}}">{{poll.title}}</a>\n\t</div>\n</div>\n');}]);
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
		$('#choice').val('');
	};

	function addKind(kind) {
		vm.pollData.kind = kind.toLowerCase();
		vm.kind = kind;
	};

	function addPoll(newPoll) {	
		vm.pollInfo = {
			data: vm.pollData,
			url: "/api/polls/"
		}
		HttpFactory.post(vm.pollInfo).then(function(res) {
			$location.url(['/poll-list/' + vm.kind.toLowerCase()])
		})
	};
}]);
'use strict';

myApp.controller('dashboardCtrl', ['$scope', function($scope) {
	var vm = this

	activate()

	function activate() {
	
	};

}]);
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
myApp.controller('listCtrl', ['$routeParams', 'HttpFactory', function($routeParams, HttpFactory) {
	var vm = this

	vm.getPolls = getPolls;

	activate()

	function activate() {
		vm.category = $routeParams.type;
		vm.categoryTitle = $routeParams.type.toUpperCase()
		vm.votes = false;
		vm.getPolls();

	};

	function getPolls() {
		var pollKind = {
			kind: vm.type,
			url: "/api/getAllPolls/" + vm.category 
		}
		HttpFactory.get(pollKind).then(function(res) {
			vm.polls = res.data
		});
	};
}]);
'use strict';

angular.module('myApp')

.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
});
(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('HttpFactory', factory);

    factory.$inject = ['$http', 'Config'];

    /* @ngInject */
    function factory($http, Config) {
        var service = {
            get: get,
            put: put,
            post: post,
            delete: _delete,
        };

        return service;

        function get(options) {
            return $http({
                method: 'GET',
                headers: options.headers,
                url: Config.API_BASE_URL + options.url,
                cache: options.cache !== undefined ? options.cache : false,
                kind: options.kind,
                params: options.params
            });
        }

        function put(options){
            return $http({
                method: 'PUT',
                data: options.data,
                headers: options.headers,
                url: Config.API_BASE_URL + options.url
            });
        }

        function post(options){
            return $http({
                method: 'POST',
                data: options.data,
                url: Config.API_BASE_URL + options.url
            });
        }

        function _delete(options){
            return $http({
                method: 'DELETE',
                data: options.data,
                url: Config.API_BASE_URL + options.url
            });
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('myApp')
        .service('Config', Service);


    /* @ngInject */
    function Service() {
        var service = {
            'API_BASE_URL':'http://localhost:8080',
        };

        return service;
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInRlbXBsYXRlcy5qcyIsImNvbnRyb2xsZXJzL2NyZWF0ZS5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvZGFzaGJvYXJkLmNvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy9kZXRhaWwuY29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL2xpc3QuY29udHJvbGxlci5qcyIsImRpcmVjdGl2ZXMvbXlFbnRlci5kaXJlY3RpdmUuanMiLCJzZXJ2aWNlcy9mYWN0b3J5cy5qcyIsInNlcnZpY2VzL3NlcnZpY2VzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBLElBQUksUUFBUSxRQUFRLE9BQU8sU0FBUyxDQUFDOztBQUVyQyxNQUFNLDBCQUFPLFVBQVUsZ0JBQWdCOztDQUV0Qzs7RUFFQyxLQUFLLEtBQUs7RUFDVixhQUFhO0VBQ2IsWUFBWTtFQUNaLGNBQWM7OztFQUdkLEtBQUssb0JBQW9CO0VBQ3pCLGFBQWE7RUFDYixZQUFZO0VBQ1osY0FBYzs7O0VBR2QsS0FBSyxvQkFBb0I7RUFDekIsYUFBYTtFQUNiLFlBQVk7RUFDWixjQUFjOzs7RUFHZCxLQUFLLGdCQUFnQjtFQUNyQixhQUFhO0VBQ2IsWUFBWTtFQUNaLGNBQWM7OztFQUdkLFdBQVcsQ0FBQyxZQUFZOzs7Ozs7O0FBTzFCO0FDdkNBLFFBQVEsT0FBTyxTQUFTLElBQUksQ0FBQyxrQkFBa0IsU0FBUyxnQkFBZ0IsQ0FBQyxlQUFlLElBQUksbUJBQW1CO0FBQy9HLGVBQWUsSUFBSSxlQUFlO0FBQ2xDLGVBQWUsSUFBSSxZQUFZO0FBQy9CLGVBQWUsSUFBSSxtQkFBbUI7QUFDdEMsZUFBZSxJQUFJLGlCQUFpQix3U0FBd1M7QUNKNVU7O0FBRUEsTUFBTSxXQUFXLGNBQWMsQ0FBQyxVQUFVLGVBQWUsYUFBYSxTQUFTLFFBQVEsYUFBYSxXQUFXO0NBQzlHLElBQUksS0FBSzs7O0NBR1QsR0FBRyxVQUFVO0NBQ2IsR0FBRyxZQUFZO0NBQ2YsR0FBRyxXQUFXO0NB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O1NBQ1AsUUFBUSxlQUFlOztJQUU1QixRQUFRLFVBQVUsQ0FBQyxTQUFTOzs7SUFHNUIsU0FBUyxRQUFRLE9BQU8sUUFBUTtRQUM1QixJQUFJLFVBQVU7WUFDVixLQUFLO1lBQ0wsS0FBSztZQUNMLE1BQU07WUFDTixRQUFROzs7UUFHWixPQUFPOztRQUVQLFNBQVMsSUFBSSxTQUFTO1lBQ2xCLE9BQU8sTUFBTTtnQkFDVCxRQUFRO2dCQUNSLFNBQVMsUUFBUTtnQkFDakIsS0FBSyxPQUFPLGVBQWUsUUFBUTtnQkFDbkMsT0FBTyxRQUFRLFVBQVUsWUFBWSxRQUFRLFFBQVE7Z0JBQ3JELE1BQU0sUUFBUTtnQkFDZCxRQUFRLFFBQVE7Ozs7UUFJeEIsU0FBUyxJQUFJLFFBQVE7WUFDakIsT0FBTyxNQUFNO2dCQUNULFFBQVE7Z0JBQ1IsTUFBTSxRQUFRO2dCQUNkLFNBQVMsUUFBUTtnQkFDakIsS0FBSyxPQUFPLGVBQWUsUUFBUTs7OztRQUkzQyxTQUFTLEtBQUssUUFBUTtZQUNsQixPQUFPLE1BQU07Z0JBQ1QsUUFBUTtnQkFDUixNQUFNLFFBQVE7Z0JBQ2QsS0FBSyxPQUFPLGVBQWUsUUFBUTs7OztRQUkzQyxTQUFTLFFBQVEsUUFBUTtZQUNyQixPQUFPLE1BQU07Z0JBQ1QsUUFBUTtnQkFDUixNQUFNLFFBQVE7Z0JBQ2QsS0FBSyxPQUFPLGVBQWUsUUFBUTs7OztLQUk5QztBQ3hETCxDQUFDLFdBQVc7SUFDUjs7SUFFQTtTQUNLLE9BQU87U0FDUCxRQUFRLFVBQVU7Ozs7SUFJdkIsU0FBUyxVQUFVO1FBQ2YsSUFBSSxVQUFVO1lBQ1YsZUFBZTs7O1FBR25CLE9BQU87O0tBRVYiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbXlBcHAgPSBhbmd1bGFyLm1vZHVsZSgnbXlBcHAnLCBbJ25nUm91dGUnXSk7XG5cbm15QXBwLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcblxuXHQkcm91dGVQcm92aWRlclxuXG5cdC53aGVuKFwiL1wiLCB7XG5cdFx0dGVtcGxhdGVVcmw6IFwibGFuZGluZy5odG1sXCIsXG5cdFx0Y29udHJvbGxlcjogXCJkYXNoYm9hcmRDdHJsXCIsXG5cdFx0Y29udHJvbGxlckFzOiBcInZtXCJcblx0fSlcblxuXHQud2hlbihcIi9wb2xsLWxpc3QvOnR5cGVcIiwge1xuXHRcdHRlbXBsYXRlVXJsOiBcInBvbGwtbGlzdC5odG1sXCIsXG5cdFx0Y29udHJvbGxlcjogXCJsaXN0Q3RybFwiLFxuXHRcdGNvbnRyb2xsZXJBczogXCJ2bVwiXG5cdH0pXG5cblx0LndoZW4oXCIvcG9sbC1kZXRhaWwvOmlkXCIsIHtcblx0XHR0ZW1wbGF0ZVVybDogXCJwb2xsLWRldGFpbC5odG1sXCIsXG5cdFx0Y29udHJvbGxlcjogXCJkZXRhaWxDdHJsXCIsXG5cdFx0Y29udHJvbGxlckFzOiBcInZtXCJcblx0fSlcblxuXHQud2hlbihcIi9jcmVhdGUtcG9sbFwiLCB7XG5cdFx0dGVtcGxhdGVVcmw6IFwiY3JlYXRlLXBvbGwuaHRtbFwiLFxuXHRcdGNvbnRyb2xsZXI6IFwiY3JlYXRlQ3RybFwiLFxuXHRcdGNvbnRyb2xsZXJBczogXCJ2bVwiXG5cdH0pXG5cblx0Lm90aGVyd2lzZSgge3JlZGlyZWN0VG86ICcvJ30pO1xufSk7XG5cblxuXG5cblxuIiwiYW5ndWxhci5tb2R1bGUoJ215QXBwJykucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkgeyR0ZW1wbGF0ZUNhY2hlLnB1dCgnY3JlYXRlLXBvbGwuaHRtbCcsJzwhLS0gTkVFRCBUTyBDUkVBVEUgRElSRUNUSVZFUyBGT1IgVEhJUyAtLT5cXG48Zm9ybSBjbGFzcz1cImNyZWF0ZS1wb2xsLWZvcm1cIj5cXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgY29sLXNtLTQgY29sLXNtLW9mZnNldC00XCI+XFxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cImFkZC10aXRsZVwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBjcmVhdGUtcG9sbC1lZGl0LWJ1dHRvblwiIG5nLWNsYXNzPVwie1xcJ2lzLWhpZGRlblxcJzogdm0uYnV0dG9uU3RhdGV9XCIgbmctY2xpY2s9XCJ2bS50b2dnbGVUaXRsZUJ1dHRvblN0YXRlKClcIj57e3ZtLnRpdGxlfX08L2J1dHRvbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgY29sLXNtLTQgY29sLXNtLW9mZnNldC00XCI+XFxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cInt7dm0udGl0bGV9fVwiIG5nLWNsYXNzPVwie1xcJ2lzLWhpZGRlblxcJzogIXZtLmJ1dHRvblN0YXRlfVwiIG5nLWJsdXI9XCJ2bS50b2dnbGVUaXRsZUJ1dHRvblN0YXRlKClcIiBuZy1tb2RlbD1cInZtLnBvbGwudGl0bGVcIj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgY29sLXNtLTQgY29sLXNtLW9mZnNldC00IHRleHQtY2VudGVyXCI+XFxuICAgICAgICAgICAgPGxhYmVsPkFkZCBvcHRpb25zITwvbGFiZWw+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGNvbC1zbS00IGNvbC1zbS1vZmZzZXQtNCB0ZXh0LWNlbnRlclwiPlxcbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGFkZC1vcHRpb25zLWJ1dHRvblwiIGFyaWEtbGFiZWw9XCJMZWZ0IEFsaWduXCIgbmctY2xpY2s9XCJ2bS5hbm90aGVyT3B0aW9uKClcIj5cXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXBsdXNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XFxuICAgICAgICAgICAgPC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgbmctcmVwZWF0PVwiY2hvaWNlIGluIHZtLnBvbGxEYXRhLmNob2ljZXMgdHJhY2sgYnkgJGluZGV4XCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCIgaWQ9XCJjaG9pY2VzLXJvd1wiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGNvbC1zbS00IGNvbC1zbS1vZmZzZXQtNFwiPlxcbiAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgbmctYmx1cj1cInZtLnN1Ym1pdE9wdGlvbigkaW5kZXgsIHZtLnBvbGwuY2hvaWNlWyRpbmRleF0pXCIgbmctY2xhc3M9XCJ7XFwnaXMtaGlkZGVuXFwnOiB2bS5wb2xsRGF0YS5jaG9pY2VzWyRpbmRleF0uc2hvd31cIiBuZy1tb2RlbD1cInZtLnBvbGwuY2hvaWNlWyRpbmRleF1cIj5cXG4gICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdCBjcmVhdGUtcG9sbC1lZGl0LWJ1dHRvblwiIG5nLWNsYXNzPVwie1xcJ2lzLWhpZGRlblxcJzogIXZtLnBvbGxEYXRhLmNob2ljZXNbJGluZGV4XS5zaG93fVwiIG5nLWNsaWNrPVwidm0ucG9sbERhdGEuY2hvaWNlc1skaW5kZXhdLnNob3cgPSAhdm0ucG9sbERhdGEuY2hvaWNlc1skaW5kZXhdLnNob3dcIj48c3BhbiBjbGFzcz1cImNob2ljZS1udW1iZXJcIj57eyRpbmRleH19Ljwvc3Bhbj57e3ZtLnBvbGxEYXRhLmNob2ljZXNbJGluZGV4XS5jaG9pY2VUaXRsZX19PC9idXR0b24+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGNvbC1zbS00IGNvbC1zbS1vZmZzZXQtNCBkcm9wZG93blwiPlxcbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0IGNyZWF0ZS1wb2xsLWVkaXQtYnV0dG9uIGRyb3Bkb3duLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPnt7dm0ua2luZH19PHNwYW4gY2xhc3M9XCJjYXJldFwiPjwvc3Bhbj48L2J1dHRvbj5cXG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51IGtpbmQtbGlzdFwiIGFyaWEtbGFiZWxsZWRieT1cImRMYWJlbFwiPlxcbiAgICAgICAgICAgICAgICA8bGkgbmctcmVwZWF0PVwia2luZCBpbiB2bS5raW5kc1wiPjxhIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIG5nLWNsaWNrPVwidm0uYWRkS2luZChraW5kKVwiPnt7a2luZH19PC9hPjwvbGk+XFxuICAgICAgICAgICAgPC91bD5cXG4gICAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgY29sLXNtLTQgY29sLXNtLW9mZnNldC00XCI+XFxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgYnRuLWxnIGNyZWF0ZS1wb2xsLWJ1dHRvblwiIG5nLWNsaWNrPVwidm0uYWRkUG9sbCh2bS5wb2xsKVwiPkNyZWF0ZSBwb2xsPC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuPC9mb3JtPicpO1xuJHRlbXBsYXRlQ2FjaGUucHV0KCdsYW5kaW5nLmh0bWwnLCdcXG48ZGl2IGNsYXNzPVwicGFnZS1oZWFkZXJcIiBzdHlsZT1cImhlaWdodDoyMDBweDtcIj5cXG5cXHQ8aDE+Vk9URUw8L2gxPlxcblxcdDxoMz5Wb3RlIGZvciB5b3VyIGZhdm9yaXRlITwvaDM+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cInJvd1wiPlxcblxcdDxkaXYgY2xhc3M9XCJjb2wtc20tM1wiPlxcblxcdFxcdDxhIGhyZWY9XCIjL3BvbGwtbGlzdC9mb29kXCIgY2xhc3M9XCJ0aHVtYm5haWxcIj5cXG5cXHQgICAgICBcXHQ8aW1nIHNyYz1cInB1YmxpYy9pbWcvZm9vZGljb24ucG5nXCIgYWx0PVwiZm9vZFwiPlxcblxcdCAgICA8L2E+XFxuXFx0PC9kaXY+XFxuXFx0PGRpdiBjbGFzcz1cImNvbC1zbS0zXCI+XFxuXFx0XFx0PGEgaHJlZj1cIiMvcG9sbC1saXN0L21vdmllc1wiIGNsYXNzPVwidGh1bWJuYWlsXCI+XFxuXFx0XFx0ICAgIDxpbWcgc3JjPVwicHVibGljL2ltZy9tb3ZpZWljb24ucG5nXCIgYWx0PVwiLi4uXCI+XFxuXFx0XFx0PC9hPlxcblxcdDwvZGl2PlxcblxcdDxkaXYgY2xhc3M9XCJjb2wtc20tM1wiPlxcblxcdFxcdDxhIGhyZWY9XCIjL3BvbGwtbGlzdC9tdXNpY1wiIGNsYXNzPVwidGh1bWJuYWlsXCI+XFxuXFx0ICAgICAgXFx0PGltZyBzcmM9XCJwdWJsaWMvaW1nL211c2ljaWNvbi5wbmdcIiBhbHQ9XCIuLi5cIj5cXG5cXHQgICAgPC9hPlxcblxcdDwvZGl2PlxcblxcdDxkaXYgY2xhc3M9XCJjb2wtc20tM1wiPlxcblxcdFxcdDxhIGhyZWY9XCIjL3BvbGwtbGlzdC9nYW1lc1wiIGNsYXNzPVwidGh1bWJuYWlsXCI+XFxuXFx0XFx0ICAgIDxpbWcgc3JjPVwicHVibGljL2ltZy92aWRlb2dhbWUuanBlZ1wiIGFsdD1cIi4uLlwiPlxcblxcdFxcdDwvYT5cXG5cXHQ8L2Rpdj5cXG48L2Rpdj5cXG4nKTtcbiR0ZW1wbGF0ZUNhY2hlLnB1dCgnbWVudS5odG1sJywnPG5hdiBjbGFzcz1cIm5hdmJhciBuYXZiYXItZGVmYXVsdFwiIHN0eWxlPVwiaGVpZ2h0OiAxMDBweFwiPlxcbiAgPGRpdiBjbGFzcz1cImNvbnRhaW5lci1mbHVpZFwiPlxcbiAgICA8ZGl2IGNsYXNzPVwibmF2YmFyLWhlYWRlclwiPlxcbiAgICAgIDxhIGNsYXNzPVwibmF2YmFyLWJyYW5kXCIgaHJlZj1cIiMvXCIgc3R5bGU9XCJmb250LXNpemU6IDJlbTtcIj5cXG4gICAgICAgIFZPVEVMXFxuICAgICAgPC9hPlxcbiAgICBcXHQ8YSBpZD1cImNyZWF0ZS1wb2xsXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzIGJ0bi1sZyBuYXZiYXItYnRuXCIgaHJlZj1cIiMvY3JlYXRlLXBvbGxcIj5DcmVhdGUgbmV3IHBvbGw8L2E+XFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuPC9uYXY+Jyk7XG4kdGVtcGxhdGVDYWNoZS5wdXQoJ3BvbGwtZGV0YWlsLmh0bWwnLCc8ZGl2IGNsYXNzPVwibGlzdC1ncm91cFwiPlxcblxcdDxkaXYgbmctcmVwZWF0PVwicG9sbCBpbiB2bS5wb2xsc1wiPlxcblxcdFxcdDxkaXYgY2xhc3M9XCJjb2wtbWQtNFwiPjwvZGl2PlxcblxcdCAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTRcIj5cXG5cXHQgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbCBwYW5lbC1wcmltYXJ5XCI+XFxuXFx0ICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWhlYWRpbmdcIj5cXG5cXHQgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwicGFuZWwtdGl0bGVcIj48c3BhbiBjbGFzcz1cImZhIGZhLWxpbmUtY2hhcnRcIj48L3NwYW4+IHt7dm0ucG9sbHNbMF0udGl0bGV9fSA8L2gzPlxcblxcdCAgICAgICAgICAgIDwvZGl2PlxcblxcdCAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+XFxuXFx0ICAgICAgICAgICAgXFx0PHVsIGNsYXNzPVwibmF2IG5hdi1waWxscyBuYXYtc3RhY2tlZFwiPlxcblxcdFxcdFxcdFxcdFxcdFxcdDxkaXYgbmctcmVwZWF0PVwib3B0aW9ucyBpbiBwb2xsLm9wdGlvbnMgdHJhY2sgYnkgJGluZGV4XCI+XFxuXFx0XFx0XFx0XFx0XFx0XFx0XFx0PGRpdiBuZy1oaWRlPVwidm0uc2hvd1Byb2dyZXNzQmFyXCI+XFxuXFx0XFx0XFx0XFx0ICAgICAgICAgICAgXFx0PGxpPjxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgZGV0YWlsLW9wdGlvblwiIG5nLWNsaWNrPVwidm0uY3VycmVudENob2ljZShvcHRpb25zKVwiPnt7b3B0aW9ucy5jaG9pY2VUaXRsZX19PC9idXR0b24+PC9saT5cXG5cXHRcXHRcXHRcXHQgICAgICAgICAgICA8L2Rpdj5cXG5cXHRcXHRcXHQgICAgICAgICAgICBcXHQ8ZGl2IG5nLXNob3c9XCJ2bS5zaG93UHJvZ3Jlc3NCYXJcIj5cXG5cXHRcXHRcXHRcXHQgICAgICAgICAgICBcXHQ8ZGl2IGNsYXNzPVwicHJvZ3Jlc3NcIj5cXG5cXHRcXHRcXHRcXHRcXHQgICAgICAgICAgICBcXHQ8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MtYmFyXCIgcm9sZT1cInByb2dyZXNzYmFyXCIgYXJpYS12YWx1ZW5vdz1cInt7b3B0aW9ucy52b3RlU2NvcmV9fVwiIGFyaWEtdmFsdWVtaW49XCIwXCIgYXJpYS12YWx1ZW1heD1cInt7dm0udG90YWxWb3RlU2NvcmV9fVwiIHN0eWxlPVwibWluLXdpZHRoOiAyZW07IHdpZHRoOiB7e3ZtLnByb2dyZXNzQmFyV2lkdGhBcnJbJGluZGV4XX19JTtcIj5cXG5cXHRcXHRcXHRcXHQgICAgICAgICAgICBcXHQgICAge3tvcHRpb25zLmNob2ljZVRpdGxlfX17e29wdGlvbnMudm90ZVNjb3JlfX1cXG5cXHRcXHRcXHRcXHQgICAgICAgICAgICBcXHQgIDwvZGl2PlxcblxcdFxcdFxcdFxcdCAgICAgICAgICAgIFxcdDwvZGl2PlxcblxcdFxcdFxcdCAgICAgICAgICAgIFxcdDwvZGl2PlxcblxcdFxcdCAgICAgICAgICAgIFxcdDwvZGl2PlxcblxcdCAgICAgICAgICAgIFxcdDwvdWw+XFxuXFx0ICAgICAgICAgICAgPC9kaXY+XFxuXFx0ICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN1Ym1pdC12b3RlLWJ0bi1jb250YWluZXJcIj5cXG5cXHRcXHQgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBuZy1jbGFzcz1cIntcXCdpcy1oaWRkZW5cXCc6ICF2bS5zaG93Vm90ZUJ1dHRvbn1cIiBjbGFzcz1cImJ0biBidG4tc3VjY2VzcyBidG4tbGcgc3VibWl0LXZvdGUtYnRuXCIgbmctY2xpY2s9XCJ2bS5zdWJtaXRWb3RlKClcIj5Wb3RlITwvYnV0dG9uPlxcblxcdFxcdCAgICAgICAgICAgIDxoNCBuZy1jbGFzcz1cIntcXCdpcy1oaWRkZW5cXCc6IHZtLnNob3dWb3RlQnV0dG9ufVwiPlRoYW5rIHlvdSBmb3IgeW91ciB2b3RlITwvaDQ+XFxuXFx0ICAgICAgICAgICAgPC9kaXY+XFxuXFx0ICAgICAgICA8L2Rpdj5cXG5cXHQgICAgPC9kaXY+XFxuXFx0XFx0XFxuXFx0PC9kaXY+XFxuPC9kaXY+Jyk7XG4kdGVtcGxhdGVDYWNoZS5wdXQoJ3BvbGwtbGlzdC5odG1sJywnPGRpdiBjbGFzcz1cImxpc3QtZ3JvdXBcIj5cXG5cXHQ8aDEgY2xhc3M9XCJjYXRlZ29yeS1saXN0LXRpdGxlXCI+PHNwYW4gY2xhc3MgPSBcImxhYmVsIGxhYmVsLXByaW1hcnlcIj57e3ZtLmNhdGVnb3J5VGl0bGV9fTwvc3Bhbj48L2gxPlxcblxcdDxkaXYgbmctcmVwZWF0PVwicG9sbCBpbiB2bS5wb2xsc1wiPlxcblxcdFxcdDxhIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbVwiIG5nLWhyZWY9XCIjL3BvbGwtZGV0YWlsL3t7cG9sbC5faWR9fVwiPnt7cG9sbC50aXRsZX19PC9hPlxcblxcdDwvZGl2PlxcbjwvZGl2PlxcbicpO31dKTsiLCIndXNlIHN0cmljdCc7XG5cbm15QXBwLmNvbnRyb2xsZXIoJ2NyZWF0ZUN0cmwnLCBbJyRzY29wZScsICdIdHRwRmFjdG9yeScswqAnJGxvY2F0aW9uJywgZnVuY3Rpb24oJHNjb3BlLCBIdHRwRmFjdG9yeSwgJGxvY2F0aW9uKSB7XG5cdHZhciB2bSA9IHRoaXM7XG5cdFxuXHRcblx0dm0uYWRkUG9sbCA9IGFkZFBvbGw7XG5cdHZtLmFkZENob2ljZSA9IGFkZENob2ljZTtcblx0dm0uYWRkVGl0bGUgPSBhZGRUaXRsZTtcblx0dm0uYWRkS2luZCA9IGFkZEtpbmQ7XG5cdHZtLnRvZ2dsZVRpdGxlQnV0dG9uU3RhdGUgPSB0b2dnbGVUaXRsZUJ1dHRvblN0YXRlO1xuXHR2bS5hbm90aGVyT3B0aW9uID0gYW5vdGhlck9wdGlvbjtcblx0dm0uc3VibWl0T3B0aW9uID0gc3VibWl0T3B0aW9uO1xuXG5cdGFjdGl2YXRlKClcblxuXHRmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcblx0XHQkKCcuZHJvcGRvd24tdG9nZ2xlJykuZHJvcGRvd24oKVxuXHRcdHZtLmNob2ljZUlkID0gMDtcblx0XHR2bS5idXR0b25TdGF0ZSA9IGZhbHNlO1xuXHRcdHZtLnRpdGxlID0gJ0FkZCBUaXRsZSc7XG5cdFx0dm0ua2luZCA9ICdBZGQgQ2F0ZWdvcnknO1xuXHRcdHZtLm51bWJlck9mT3B0aW9ucyA9IFtdXG5cdFx0dm0ua2luZHMgPSBbXG5cdFx0XHRcIkZvb2RcIixcblx0XHRcdFwiTXVzaWNcIixcblx0XHRcdFwiTW92aWVzXCIsXG5cdFx0XHRcIkdhbWVzXCJcblx0XHRdXG5cdFx0dm0ub3B0aW9uc0lkID0gMFxuXHRcdHZtLnBvbGxEYXRhID0ge1xuXHRcdFx0cXVlc3Rpb246ICcnLFxuXHRcdFx0Y2hvaWNlczogW10sXG5cdFx0XHRraW5kOiAnJ1xuXHRcdH1cblx0fTtcblxuXHRmdW5jdGlvbiB0b2dnbGVUaXRsZUJ1dHRvblN0YXRlKCkge1xuXHRcdGlmICh2bS5idXR0b25TdGF0ZSA9PT0gZmFsc2UpIHtcblx0XHRcdHZtLmJ1dHRvblN0YXRlID0gdHJ1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dm0uYnV0dG9uU3RhdGUgPSBmYWxzZTtcblx0XHRcdGFkZFRpdGxlKCk7XG5cdFx0fVxuXHR9O1xuXG5cdGZ1bmN0aW9uIGFkZFRpdGxlKCkge1xuXHRcdHZtLnBvbGxEYXRhLnF1ZXN0aW9uID0gdm0ucG9sbC50aXRsZTtcblx0XHR2bS50aXRsZSA9IHZtLnBvbGwudGl0bGU7XG5cdH07XG5cblx0ZnVuY3Rpb24gYW5vdGhlck9wdGlvbigpIHtcblx0XHR2bS5wb2xsRGF0YS5jaG9pY2VzLnB1c2goeydzaG93JzogZmFsc2UsICd2b3RlU2NvcmUnOiAwLCAnY2hvaWNlSWQnOiB2bS5jaG9pY2VJZH0pXG5cdFx0dm0uY2hvaWNlSWQgKz0gMTtcblx0fTtcblxuXHRmdW5jdGlvbiBzdWJtaXRPcHRpb24oaW5kZXgsIG1vZGVsKSB7XG5cdFx0dm0ucG9sbERhdGEuY2hvaWNlc1tpbmRleF0uY2hvaWNlVGl0bGUgPSBtb2RlbDtcblx0XHR2bS5wb2xsRGF0YS5jaG9pY2VzW2luZGV4XS5zaG93ID0gdHJ1ZTtcblx0fTtcdFxuXG5cdGZ1bmN0aW9uIGFkZENob2ljZSgpIHtcblx0XHR2bS5wb2xsRGF0YS5jaG9pY2VzLnB1c2goeydjaG9pY2VUaXRsZSc6IHZtLnBvbGwuY2hvaWNlLCAndm90ZVNjb3JlJzogMCwgJ2Nob2ljZUlkJzogdm0uY2hvaWNlSWR9KTtcblx0XHR2bS5jaG9pY2VJZCArPSAxO1xuXHRcdCQoJyNjaG9pY2UnKS52YWwoJycpO1xuXHR9O1xuXG5cdGZ1bmN0aW9uIGFkZEtpbmQoa2luZCkge1xuXHRcdHZtLnBvbGxEYXRhLmtpbmQgPSBraW5kLnRvTG93ZXJDYXNlKCk7XG5cdFx0dm0ua2luZCA9IGtpbmQ7XG5cdH07XG5cblx0ZnVuY3Rpb24gYWRkUG9sbChuZXdQb2xsKSB7XHRcblx0XHR2bS5wb2xsSW5mbyA9IHtcblx0XHRcdGRhdGE6IHZtLnBvbGxEYXRhLFxuXHRcdFx0dXJsOiBcIi9hcGkvcG9sbHMvXCJcblx0XHR9XG5cdFx0SHR0cEZhY3RvcnkucG9zdCh2bS5wb2xsSW5mbykudGhlbihmdW5jdGlvbihyZXMpIHtcblx0XHRcdCRsb2NhdGlvbi51cmwoWycvcG9sbC1saXN0LycgKyB2bS5raW5kLnRvTG93ZXJDYXNlKCldKVxuXHRcdH0pXG5cdH07XG59XSk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5teUFwcC5jb250cm9sbGVyKCdkYXNoYm9hcmRDdHJsJywgWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcblx0dmFyIHZtID0gdGhpc1xuXG5cdGFjdGl2YXRlKClcblxuXHRmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcblx0XG5cdH07XG5cbn1dKTsiLCIndXNlIHN0cmljdCc7XG5cbm15QXBwLmNvbnRyb2xsZXIoJ2RldGFpbEN0cmwnLCBbJ0h0dHBGYWN0b3J5JywgJyRyb3V0ZVBhcmFtcycsIGZ1bmN0aW9uKEh0dHBGYWN0b3J5LCAkcm91dGVQYXJhbXMpIHtcblx0dmFyIHZtID0gdGhpc1xuXG5cdHZtLmdldFBvbGwgPSBnZXRQb2xsO1xuXHR2bS5zdWJtaXRWb3RlID0gc3VibWl0Vm90ZTtcblx0dm0uc2hvd1Jlc3VsdCA9IHNob3dSZXN1bHQ7XG5cdHZtLmN1cnJlbnRDaG9pY2UgPSBjdXJyZW50Q2hvaWNlO1xuXHR2bS5jb3VudFByb2dyZXNzQmFyV2lkdGggPSBjb3VudFByb2dyZXNzQmFyV2lkdGg7XG5cblx0YWN0aXZhdGUoKVxuXG5cdGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xuXHRcdHZtLnR5cGUgPSAkcm91dGVQYXJhbXMudHlwZTtcblx0XHR2bS5wb2xsSWQgPSAkcm91dGVQYXJhbXMuaWQ7XG5cdFx0dm0uc2hvd1Byb2dyZXNzQmFyID0gZmFsc2U7XG5cdFx0dm0uc2hvd1ZvdGVCdXR0b24gPSB0cnVlO1xuXHRcdHZtLnRvdGFsVm90ZVNjb3JlID0gMDtcblx0XHR2bS5wcm9ncmVzc0JhcldpZHRoQXJyID0gW107XG5cdFx0Z2V0UG9sbCgpXG5cdH07XG5cblx0ZnVuY3Rpb24gZ2V0UG9sbCgpIHtcblx0XHR2YXIgc3BlY2lmaWNQb2xsID0ge1xuXHRcdFx0dXJsOiBcIi9hcGkvcG9sbHMvXCIgKyB2bS5wb2xsSWRcblx0XHR9XG5cdFx0SHR0cEZhY3RvcnkuZ2V0KHNwZWNpZmljUG9sbCkudGhlbihmdW5jdGlvbihyZXMpIHtcblx0XHRcdHZtLnBvbGxzID0gcmVzLmRhdGE7XG5cdFx0fSk7XG5cdH07XG5cblx0ZnVuY3Rpb24gc3VibWl0Vm90ZSgpIHtcblx0XHR2YXIgdXBkYXRlZFZvdGUgPSB7XG5cdFx0XHR1cmw6IFwiL2FwaS92b3Rlcy91cGRhdGUvXCIgKyB2bS5jdXJyZW50Q2hvaWNlSWQgK1wiOlwiKyB2bS5wb2xsSWRcblx0XHR9O1xuXHRcdEh0dHBGYWN0b3J5LmdldCh1cGRhdGVkVm90ZSkudGhlbihmdW5jdGlvbihyZXMpIHtcblx0XHRcdHZtLnNob3dWb3RlQnV0dG9uID0gZmFsc2U7XG5cdFx0XHRzaG93UmVzdWx0KCk7XG5cdFx0fSk7XG5cdH07XG5cblx0ZnVuY3Rpb24gc2hvd1Jlc3VsdCgpIHtcblx0XHR2YXIgc3BlY2lmaWNQb2xsID0ge1xuXHRcdFx0dXJsOiBcIi9hcGkvcG9sbHMvXCIgKyB2bS5wb2xsSWRcblx0XHR9XG5cdFx0SHR0cEZhY3RvcnkuZ2V0KHNwZWNpZmljUG9sbCkudGhlbihmdW5jdGlvbihyZXMpIHtcblx0XHRcdHZtLnBvbGxzID0gcmVzLmRhdGE7XG5cdFx0XHR2bS5wb2xsT3B0aW9ucyA9IHZtLnBvbGxzWzBdLm9wdGlvbnM7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZtLnBvbGxPcHRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHZtLnRvdGFsVm90ZVNjb3JlICs9IHZtLnBvbGxPcHRpb25zW2ldLnZvdGVTY29yZVxuXHRcdFx0fVxuXHRcdFx0dm0uY291bnRQcm9ncmVzc0JhcldpZHRoKCk7XG5cdFx0fSk7XG5cdH07XG5cblx0ZnVuY3Rpb24gY3VycmVudENob2ljZSh2b3RlT3B0aW9uKSB7XG5cdFx0dm0uY3VycmVudENob2ljZUlkID0gdm90ZU9wdGlvbi5jaG9pY2VJZDtcblx0fTtcblxuXHRmdW5jdGlvbiBjb3VudFByb2dyZXNzQmFyV2lkdGgoKSB7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2bS5wb2xsT3B0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGNvdW50ID0gdm0ucG9sbE9wdGlvbnNbaV0udm90ZVNjb3JlIC8gdm0udG90YWxWb3RlU2NvcmU7XG5cdFx0XHRjb3VudCAqPSAxMDBcblx0XHRcdHZtLnByb2dyZXNzQmFyV2lkdGhBcnIucHVzaChjb3VudClcblx0XHR9XG5cdFx0dm0uc2hvd1Byb2dyZXNzQmFyID0gdHJ1ZTtcblx0fTtcblx0XG59XSk7IiwibXlBcHAuY29udHJvbGxlcignbGlzdEN0cmwnLCBbJyRyb3V0ZVBhcmFtcycsICdIdHRwRmFjdG9yeScsIGZ1bmN0aW9uKCRyb3V0ZVBhcmFtcywgSHR0cEZhY3RvcnkpIHtcblx0dmFyIHZtID0gdGhpc1xuXG5cdHZtLmdldFBvbGxzID0gZ2V0UG9sbHM7XG5cblx0YWN0aXZhdGUoKVxuXG5cdGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xuXHRcdHZtLmNhdGVnb3J5ID0gJHJvdXRlUGFyYW1zLnR5cGU7XG5cdFx0dm0uY2F0ZWdvcnlUaXRsZSA9ICRyb3V0ZVBhcmFtcy50eXBlLnRvVXBwZXJDYXNlKClcblx0XHR2bS52b3RlcyA9IGZhbHNlO1xuXHRcdHZtLmdldFBvbGxzKCk7XG5cblx0fTtcblxuXHRmdW5jdGlvbiBnZXRQb2xscygpIHtcblx0XHR2YXIgcG9sbEtpbmQgPSB7XG5cdFx0XHRraW5kOiB2bS50eXBlLFxuXHRcdFx0dXJsOiBcIi9hcGkvZ2V0QWxsUG9sbHMvXCIgKyB2bS5jYXRlZ29yeSBcblx0XHR9XG5cdFx0SHR0cEZhY3RvcnkuZ2V0KHBvbGxLaW5kKS50aGVuKGZ1bmN0aW9uKHJlcykge1xuXHRcdFx0dm0ucG9sbHMgPSByZXMuZGF0YVxuXHRcdH0pO1xuXHR9O1xufV0pOyIsIid1c2Ugc3RyaWN0JztcblxuYW5ndWxhci5tb2R1bGUoJ215QXBwJylcblxuLmRpcmVjdGl2ZSgnbmdFbnRlcicsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICBlbGVtZW50LmJpbmQoXCJrZXlkb3duIGtleXByZXNzXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgaWYoZXZlbnQud2hpY2ggPT09IDEzKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgICAgICAgICBzY29wZS4kZXZhbChhdHRycy5uZ0VudGVyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiBcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xufSk7IiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnbXlBcHAnKVxuICAgICAgICAuZmFjdG9yeSgnSHR0cEZhY3RvcnknLCBmYWN0b3J5KTtcblxuICAgIGZhY3RvcnkuJGluamVjdCA9IFsnJGh0dHAnLCAnQ29uZmlnJ107XG5cbiAgICAvKiBAbmdJbmplY3QgKi9cbiAgICBmdW5jdGlvbiBmYWN0b3J5KCRodHRwLCBDb25maWcpIHtcbiAgICAgICAgdmFyIHNlcnZpY2UgPSB7XG4gICAgICAgICAgICBnZXQ6IGdldCxcbiAgICAgICAgICAgIHB1dDogcHV0LFxuICAgICAgICAgICAgcG9zdDogcG9zdCxcbiAgICAgICAgICAgIGRlbGV0ZTogX2RlbGV0ZSxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gc2VydmljZTtcblxuICAgICAgICBmdW5jdGlvbiBnZXQob3B0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IG9wdGlvbnMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICB1cmw6IENvbmZpZy5BUElfQkFTRV9VUkwgKyBvcHRpb25zLnVybCxcbiAgICAgICAgICAgICAgICBjYWNoZTogb3B0aW9ucy5jYWNoZSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5jYWNoZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGtpbmQ6IG9wdGlvbnMua2luZCxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IG9wdGlvbnMucGFyYW1zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHB1dChvcHRpb25zKXtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgICAgICBkYXRhOiBvcHRpb25zLmRhdGEsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogb3B0aW9ucy5oZWFkZXJzLFxuICAgICAgICAgICAgICAgIHVybDogQ29uZmlnLkFQSV9CQVNFX1VSTCArIG9wdGlvbnMudXJsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHBvc3Qob3B0aW9ucyl7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIGRhdGE6IG9wdGlvbnMuZGF0YSxcbiAgICAgICAgICAgICAgICB1cmw6IENvbmZpZy5BUElfQkFTRV9VUkwgKyBvcHRpb25zLnVybFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBfZGVsZXRlKG9wdGlvbnMpe1xuICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICAgICAgICAgIGRhdGE6IG9wdGlvbnMuZGF0YSxcbiAgICAgICAgICAgICAgICB1cmw6IENvbmZpZy5BUElfQkFTRV9VUkwgKyBvcHRpb25zLnVybFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ215QXBwJylcbiAgICAgICAgLnNlcnZpY2UoJ0NvbmZpZycsIFNlcnZpY2UpO1xuXG5cbiAgICAvKiBAbmdJbmplY3QgKi9cbiAgICBmdW5jdGlvbiBTZXJ2aWNlKCkge1xuICAgICAgICB2YXIgc2VydmljZSA9IHtcbiAgICAgICAgICAgICdBUElfQkFTRV9VUkwnOidodHRwOi8vbG9jYWxob3N0OjgwODAnLFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBzZXJ2aWNlO1xuICAgIH1cbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
