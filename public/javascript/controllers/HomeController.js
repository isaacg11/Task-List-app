//lines 2-6 references our 'app' module, creates our HomeController and injects 'HomeFactory' for later use.
(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);
	HomeController.$inject = ["HomeFactory"];
//line 8 is an anonymous function 'HomeController' that runs automatically, see below notes for more details.
function HomeController(HomeFactory) {
//line 10 is defining the variable vm to equal 'this' whenever it is used to databind between the view and the controller.
var vm = this;
//lines 12-14 are invoking functions in the 'HomeFactory' and connecting the data to the view using 'vm'. 
vm.tasks = HomeFactory.tasks; 
vm.deleteTask = HomeFactory.deleteTask;
vm.completeTask = HomeFactory.completeTask;
}
})();