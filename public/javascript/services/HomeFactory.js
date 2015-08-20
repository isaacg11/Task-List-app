//lines 2-6 references our 'app' module, creates our HomeFactory and injects '$http','$q' for later use.
(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);
	HomeFactory.$inject = ['$http', '$q'];
	//line 9 is an anonymous function that will run when the program is started, it acts as a giant object for the code it
	//contains inside it's curly braces.
	function HomeFactory($http, $q) {
	//line 12 is an empty object which will hold the functions// line 12 is an empty array which will be used to post
	//multiple objects within it.
	var o = {};
	o.tasks = [];
	//line 16 is a function which has 2 main parts..(A) First, it will send an $http post request..(B) If  successful, it will
	//send a response with a task_id and push the "task" object into an array to post it to mongodb using "Task.js" as the model
	//for the data being posted.
	o.postTask = function(task) {
		var q = $q.defer();
		$http.post('/wtf/apiCall/Task', task).success(function(res) {
			task._id = res.id;
			task.dateCreated = new Date();
			o.tasks.push(task);
			q.resolve();
		}).error(function(res) {
			q.reject(res);
		});
		return q.promise;
	};
	o.completeTask = function(task) {
		$http.post('/wtf/apiCall/completeTask/' + task._id).success(function(res) {
			task.dateCompleted = new Date();
		});
	};
	o.deleteTask = function(task) {
		$http.post('/wtf/apiCall/deleteTask/' + task._id).success(function(res) {
			o.tasks.splice(o.tasks.indexOf(task), 1);
		});
	};
	o.getTask = function(id) {
		var q = $q.defer();
		$http.get('/wtf/apiCall/Task/' + id).success(function(res){
			q.resolve(res);
		});
		return q.promise;
	};

	function getTasks() {
		$http.get('/wtf/apiCall/Task').success(function(res) {
			for(var i = 0; i < res.length; i++) {
				o.tasks.push(res[i]);
			}
		});
	}
	getTasks();
	return o;
}
})();