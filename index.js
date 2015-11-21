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
        email    : 'm25lazi@live.com',
        password : 'm25lazi'
    }, authHandler);
    
});

app.get('/api/read/gmail', function (req, res) {
    console.log("GOT API READ");
    var ref = new firebase('https://connect-them-rnd.firebaseio.com/newdata');
    
    function authHandler(error, authData) {
        if (error) {
            console.log("Login Failed!", error);
            res.end(JSON.stringify(error));
        } else {
            console.log("Authenticated successfully with payload:", authData);
            ref.on("value", function(snapshot) {
                console.log(snapshot.val());
                res.end(JSON.stringify(snapshot.val()));
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
                res.end(JSON.stringify(errorObject));
            });
            
        }
    }
    
    ref.authWithCustomToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2IjowLCJkIjp7InByb3ZpZGVyIjoicGFzc3dvcmQiLCJ1aWQiOiIwYjFhNjg1My03NGZhLTRlOGQtODQwOC0zZjdlMmMzMTY0NzYifSwiaWF0IjoxNDQ4MDM5NDk3fQ.zLXa7T7LIRdN11g9kytHNJSqEGSql6uzAnRTd5NHCtw', authHandler);
    
});


app.get('/api/read/live', function (req, res) {
    console.log("GOT API READ");
    var ref = new firebase('https://connect-them-rnd.firebaseio.com/newdata');
    
    function authHandler(error, authData) {
        if (error) {
            console.log("Login Failed!", error);
            res.end(JSON.stringify(error));
        } else {
            console.log("Authenticated successfully with payload:", authData);
            ref.on("value", function(snapshot) {
                console.log(snapshot.val());
                res.end(JSON.stringify(snapshot.val()));
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
                res.end(JSON.stringify(errorObject));
            });
            
        }
    }
    
    ref.authWithCustomToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2IjowLCJkIjp7InByb3ZpZGVyIjoicGFzc3dvcmQiLCJ1aWQiOiI5MWE0MjE4NS02YjNkLTQ3ZGMtYjhiZC0wNTRkMWQ3MzUwY2YifSwiaWF0IjoxNDQ4MDQwNzc2fQ.Pmwp_VLV-ip-21ybJrcHqXCXuF-bMRH5z8bV5uwqppc', authHandler);
    
});


app.get('/api/write', function (req, res) {
    console.log("GOT API WRITE");
    var ref = new firebase('https://connect-them-rnd.firebaseio.com/uno/1002');
    
    function onComplete(error) {
        if (error) {
            res.end(JSON.stringify(error));
        } else {
            res.end(JSON.stringify({status : 1}));
        }
    }
    
    ref.set(25, onComplete);
    
});

app.get('/api/query', function (req, res) {
    console.log("GOT API QUERY");
    var ref = new firebase('https://connect-them-rnd.firebaseio.com/uno');
    ref.orderByKey().startAt('1001').once('value', function(snapshot){
        res.end(JSON.stringify(snapshot.val()));
    });
    
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

gmail
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2IjowLCJkIjp7InByb3ZpZGVyIjoicGFzc3dvcmQiLCJ1aWQiOiIwYjFhNjg1My03NGZhLTRlOGQtODQwOC0zZjdlMmMzMTY0NzYifSwiaWF0IjoxNDQ4MDM5NDk3fQ.zLXa7T7LIRdN11g9kytHNJSqEGSql6uzAnRTd5NHCtw

live
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2IjowLCJkIjp7InByb3ZpZGVyIjoicGFzc3dvcmQiLCJ1aWQiOiI5MWE0MjE4NS02YjNkLTQ3ZGMtYjhiZC0wNTRkMWQ3MzUwY2YifSwiaWF0IjoxNDQ4MDQwNzc2fQ.Pmwp_VLV-ip-21ybJrcHqXCXuF-bMRH5z8bV5uwqppc
*/
