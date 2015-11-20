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
    var rootRef = new firebase('https://docs-examples.firebaseio.com/web/data');
    
    var session = new Session();
    session.verify(req.cookies.session, function(success){
        if(success){
            res.end(JSON.stringify({ "userId" : session.user }));
        }
        else{
            res.clearCookie('session');
            res.end(JSON.stringify({"error" : { "code" : 103 , "message" : "Invalid Session"}}));
        }
    });
});

