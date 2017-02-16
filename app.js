var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var utils = require("./utils");

const repo = require('./repo')();

var app = express();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8088');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.static(__dirname + "public"));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
	extended: true
}));

var server = app.listen(3000, function () {
	var port = server.address().port;
	console.log("listening on port ", port);
});

app.get("/test", function(req, res) {
	var msg = 'welcome test';
	res.status(200).json(msg);
});

app.get("/User/:UserId", function(req, res) {

	var userId = req.params.UserId;

	repo.getUserDaysLeft(userId, function(err, results) {
		if (!err) {
			res.status(200).json(results);
		} else {
			res.status(500).send('Error retrieving results ' + err);
		}
	})
	
});

app.get("/User/Requests/:UserId", function(req, res) {

	var userId = req.params.UserId;

	repo.getUserPendingRequests(userId, function(err, results) {
		if (!err) {
			res.status(200).json(results);
		} else {
			res.status(500).send('Error retrieving results ' + err);
		}
	})
});

app.get("/Directors/Requests/:UserId", function(req, res) {

	var userId = req.params.UserId;

	repo.getAllUserRequests(userId, function(err, results) {
		if (!err) {
			res.status(200).json(results);
		} else {
			res.status(500).send('Error retrieving results ' + err);
		}
	})
});



app.get("/User/:UserId", function(req, res) {

	var userId = req.params.UserId;

	repo.getUserDaysLeft(userId, function(err, results) {
		if (!err) {
			res.status(200).json(results);
		} else {
			res.status(500).send('Error retrieving results ' + err);
		}
	})
	
});
