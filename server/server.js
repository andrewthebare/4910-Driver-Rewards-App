var express = require('express');
var mysql = require('mysql');

var app = express();
var fs = require("fs");

//Creates the connection
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})

//This is necissary to allow json to be passed in our messages
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//----------------------Basic Get Format --------------------------------------------------

//this collects every get message sent to the defined address
//Req and res are very important parameters
//  req- this is the request that we receive, we can find all kinds of info passed from whatever made the request here
//  res- this is the result that we send back. Unless we send something back, the original sender will wait
//        a certain amount of time before declaring the message lost. We can package data to send back, and we need to
//        send a status code to tell the original sender about the status of their message. ex: 200 is success 404 means does not exist
app.get('/',function (req,res){
  console.log('Someone is getting from /');

  //this creates a connection to the DB
  var con = mysql.createConnection({
    host: "db-prod.cjpjh4cuj9z5.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "Team3Test",
    database: "sys"
  });
  
  //This actually makes the connection to the DB, then, if it succeeds, makes a query using sql
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM users", function (err, result, fields) {
      if (err) throw err;
      console.log('result', result);
    });
  });

  //This sends a 200 status message that basically tells the front end client that it was done successfully
  res.send(200);
})

//this collects all post messages sent to <connectionaddress>/newUser
app.post('/newUser',function(req,res){
  console.log('Someone is posting a new user!');
  console.log(req.body);

  var con = mysql.createConnection({
    host: "db-prod.cjpjh4cuj9z5.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "Team3Test",
    database: "sys"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    con.query("insert into users(FirstName, LastName) values('Fred','Flinstone')", function (err, result, fields) {
      if (err) throw err;
      // console.log('result', result);
    });
  });

  //this sends a json response back to the front end as well as a 200 status code
  res.send({'response':'Thanks'}).status(200);

})