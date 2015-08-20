//lines 2-7 creates our 'app' module and injects the dependencies $stateProvider & $urlRouterProvider
// into Config for later use.
(function() {
	'use strict';
	angular.module('app', ['ui.router'])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
//lines 8-13 says that when a user goes to '/' then render the 'home.html' template.
function Config($stateProvider, $urlRouterProvider) {
	$stateProvider.state('Home',{
		url: '/',
		templateUrl: 'views/home.html'
	});
//lines 15-18 says that when a user goes to '/add' then render the 'addTask.html' template.
$stateProvider.state('add',{
	url: '/add',
	templateUrl: 'views/addTask.html'
});
//line 20 says to use '/' if no other route is specified by user.
$urlRouterProvider.otherwise('/');
}
})();
