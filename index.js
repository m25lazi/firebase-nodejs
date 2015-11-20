var path = require('path');
global.appRoot = path.resolve(__dirname);


var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var firebase = require("firebase");
var firebaseTokenGenerator = require("firebase-token-generator");

var app = express();
var port_number = process.env.PORT || 3000;
var server = app.listen(port_number, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("API app listening at http://%s:%s", host, port);
  
});


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    return next();
});


app.get('/api/read', function (req, res) {
    console.log("GOT API READ");
    var ref = new firebase('https://connect-them-rnd.firebaseio.com');
    
    function authHandler(error, authData) {
        if (error) {
            console.log("Login Failed!", error);
            res.end(JSON.stringify(error));
        } else {
            console.log("Authenticated successfully with payload:", authData);
            res.end(JSON.stringify(authData));
        }
    }
    
    ref.authWithPassword({
        email    : 'm25lazi@gmail.com',
        password : 'm25lazi'
    }, authHandler);
    
});

/*
GENERATE TOKEN
var tokenGenerator = new FirebaseTokenGenerator("<YOUR_FIREBASE_SECRET>");
var token = tokenGenerator.createToken({uid: "1", some: "arbitrary", data: "here"});


AUTH CALLBACK
function authHandler(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
}

TOKEN AUTH
ref.authWithCustomToken("<token>", authHandler);

ANONYMOUS AUTH
ref.authAnonymously(authHandler);

PASSWORD AUTH
ref.authWithPassword({
  email    : 'bobtony@firebase.com',
  password : 'correcthorsebatterystaple'
}, authHandler);

OAUTH - providers ("facebook", "github", "google", or "twitter")
ref.authWithOAuthPopup("<provider>", authHandler);
ref.authWithOAuthRedirect("<provider>", authHandler);

*/
