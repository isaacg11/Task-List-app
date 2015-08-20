//lines 2-6 references our 'app' module, creates our addTaskController and injects 'HomeFactory','$state' for later use.
(function() {
	'use strict';
	angular.module('app')
	.controller('addTaskController', addTaskController);
	addTaskController.$inject = ['HomeFactory', '$state'];
//line 8 is an anonymous function 'addTaskController' that runs automatically, see below notes for more details.
function addTaskController(HomeFactory, $state) {
//line 10 is defining the variable vm to equal 'this' whenever it is used to databind between the view and the controller.
var vm = this;
//line 12 defines an empty object which will be used to place data into before sending to the HomeFactory.
vm.task = {};
//line 16 is a function that accesses HomeFactory.js and activates the 'postTask()' function on line 17 of HomeFactory.js;
//then, at the same time it puts the data input by the user from the ng-model textarea on line 6 of addTask.html and places it 
//into the empty object "vm.task" on line 12 and passes that object with the new data to the 'postTask()' function. Then, it
//will redirect to the 'Home' $state, which will render the Home.html template.
vm.addTask = function() {
	HomeFactory.postTask(vm.task).then(function() {
		$state.go('Home');
	});
};
}
})();