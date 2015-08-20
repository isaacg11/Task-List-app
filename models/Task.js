//line 2 imports 'mongoose' module.
var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
	description: {
		type: String,
		required: true
	},
	dateDeleted: {
		type: Date,
		default: null
	},
	dateCompleted: {
		type: Date,
		default: null
	},
	dateCreated: Date,
	comments: [{
		body: String,
		username: String,
		dateCreated: Date
	}]
});

mongoose.model('Task', TaskSchema);