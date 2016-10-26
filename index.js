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

var app = express();

firebase.initializeApp({
	serviceAccount: "privkey.json",
	databaseURL: "https://optio-toll.firebaseio.com"
});
var users = firebase.database().ref("users");   //Reference to users

/**
 * Google cloud storage part
 */
var CLOUD_BUCKET= "optio-toll.appspot.com"; //From storage console, list of buckets
var gcs = gcloud.storage({
    projectId: '163118324324', //from storage console, then click settings, then "x-goog-project-id"
    keyFilename: 'privkey.json' //the key we already set up
});

function getPublicUrl(filename) {
    return 'https://storage.googleapis.com/' + CLOUD_BUCKET + '/' + filename;
}

var bucket = gcs.bucket(CLOUD_BUCKET);

//_____________________________________________________________

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

function sendUploadToGCS (req, res, next) {
    if (!req.file) {
        return next();
    }

    var gcsname = Date.now() + req.file.originalname;
    var file = bucket.file(gcsname);


    var stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    });

    stream.on('error', function (err) {
        req.file.cloudStorageError = err;
        next(err);
    });

    stream.on('finish', function () {
        req.file.cloudStorageObject = gcsname;
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
        var options = {
            entity: 'allUsers',
            role: gcs.acl.READER_ROLE
        };
        file.acl.add(options, function(a,e){next();});//Make file world-readable; this is async so need to wait to return OK until its done
    });

    stream.end(req.file.buffer);
}

app.post('/uploadFile', uploader.single("img"), sendUploadToGCS, function(req, res, next) {
	var data = {"text" : req.body.todoText};
	console.log("Client wants to upload file to Google Cloud");
    if(req.file)
    	console.log("req.file exists");
        data.img = getPublicUrl(req.file.cloudStorageObject);
});

app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});
