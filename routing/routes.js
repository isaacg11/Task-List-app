
//lines 3 & 4 import the server module Exress //
var express = require('express');
var router = express.Router();
//lines 6 & 7 import the db module Mongoose//
var mongoose = require('mongoose');
var Task = mongoose.model('Task');

router.post('/wtf/apiCall/Task', function(req, res, next) {
	var createdTask = new Task(req.body);
	createdTask.save(function(err, task) {
		console.log(task);
		if(err) return next(err);
		res.send({id: task._id});
	});
});
router.post('/wtf/apiCall/completeTask/:task', function(req, res, next) {
	Task.update({_id:req.task._id}, {dateCompleted: new Date()}, function(err, numberAffected) {
		if(err) return next(err);
		if(numberAffected.nModified !== 1) res.status(400).send("You done messed up.");
		else res.send("Success");
	});
});
router.get('/wtf/apiCall/Task', function(req, res, next) {
	var query = Task.find({dateDeleted: null});
	query.exec(function(err, tasks) {
		if(err) return next(err);
		res.json(tasks);
	});
});
router.param('task', function(req, res, next, id) {
	Task.findOne({_id: id}, function(err, task) {
		if(err) return next(err);
		req.task = task;
		next();
	});
});

router.post('/wtf/apiCall/deleteTask/:task', function(req, res, next) {
	Task.update({_id : req.task.id}, {dateDeleted: new Date()}, function(err, numberAffected) {
		if(err) return next(err);
		if(numberAffected.nModified > 1) res.status(400).send("YOU HAVE DELETED TOO MANY TASKS!!!");
		else if(numberAffected.nModified !== 1) res.status(400).send("Nothing has been deleted. You have failed.");
		else res.send("You have deleted the task.");
	});
});



//line 53 says to export the module to be used in other files in the app
module.exports = router;