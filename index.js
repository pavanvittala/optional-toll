function stripEmail(email) {
	return email.replace('.', ',');
}

var express = require('express');
var bodyParser = require("body-parser");

var gcloud = require('google-cloud');
var firebase = require('firebase');
var multer = require("multer");
var uploader = multer({ storage: multer.memoryStorage({}) });
var app = express();
var port = process.env.PORT || 3000;
//var lib = require('/lib.js');

//var libInstance = new lib();

var app = express();

firebase.initializeApp({
	serviceAccount: "privkey.json",
	databaseURL: "https://optio-toll.firebaseio.com"
});

var users = firebase.database().ref("users");   //Reference to users

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res) {
	console.log("Looking at the root directory?");
});

app.post('/addUser', function(req, res) {
	if (!req.body) {
		return res.sendStatus(400);
	}
	//res.send(console.log("Client wants to add a user: " + req.body.data.Email));
	console.log("Email from Data: "+req.body.data[2]);
	console.log("Firstname from Data: "+req.body.data[0]);
	console.log("Lastname from Data: "+req.body.data[1]);
	console.log("Password from Data: "+req.body.data[3]);
	var listOfData = req.body.data;
	var GMU = req.body.GMU;
	firebase.database().ref('users/'+stripEmail(listOfData[2])).set({user:{
		firstname: listOfData[0],
		lastname: listOfData[1],
		password: listOfData[3],
		savedLocations: [GMU]
    }});
});

app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});
