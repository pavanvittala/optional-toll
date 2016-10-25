var express = require('express');
var bodyParser = require("body-parser");

var gcloud = require('google-cloud');
var firebase = require('firebase');
var multer = require("multer");
var uploader = multer({ storage: multer.memoryStorage({}) });
var app = express();
var port = process.env.PORT || 3000;
/*
//app.use(express.static('public/'));
app.use(express.static('public'));
*/
var app = express();

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(jsonParser);
app.use(urlencodedParser);

//app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	console.log("Looking at the root directory?");
});

app.post('/addUser', urlencodedParser, function(req, res) {
	if (!req.body) {
		return res.sendStatus(400);
	}
	console.log("Client wants to add a user: " + req.body.data);

});

app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});

/*
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
*/
