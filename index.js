var express = require('express');
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

var express = require('express');
var app = express();

//app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});

app.get('/', function(req, res) {
	console.log("Looking at the root directory?");
});


/*
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
*/

