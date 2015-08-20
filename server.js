//lines 2-6 are importing modules to use in our app//
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;
//line 8 imports the 'mongoose' module for use of the mongodb//
var mongoose = require('mongoose');
//line 10 says to use the Task.js file as the model when passing data to mongodb
require('./models/Task');
//line 12 connects mongodb to the server//
mongoose.connect('mongodb://localhost/tasklist');
//line 14 says we want to use the views folder
app.set('views', path.join(__dirname, 'views'));
//line 16 sets the view engine that will render HTML from the server to the client
app.engine('.html', require('ejs').renderFile);
//line 18 & 19 Allow the listed directories to be usable on the client side
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
//line 21, 22, & 23 says we want to render html files
app.set('view engine', 'html');
app.set('view options', {
	layout: false
});
//line 26 & 27 are middleware that allows for us to parse JSON and UTF-8 from the body of an HTTP request
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//line 29 & 30 says to use the 'routes' file when the base '/' is accessed for all routing
var taskRoutes = require('./routing/routes');
app.use('/', taskRoutes);
//lines 32 & 33 says when the '/' loads, render the index page
app.get('/', function(req, res) {
	res.render('index');
});
//lines 36-39 say to for the server to listen at port 3000
var server = app.listen(port, function() {
	var host = server.address().address;
	console.log('Example app listening at http://localhost:' + port);
});