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

  var con = mysql.createConnection({
    host: "db-prod.cjpjh4cuj9z5.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "Team3Test",
    database: "sys"
  });
  
  //Step 2 - parse out the info from the message
  //          The JSON payload that we load is found in req.body
  let body = req.body;
  console.log('body', body);

  ({firstName,lastName} = body);

  console.log('firstName',firstName)
  console.log('lastname',lastName)

  //there will be more to parse out eventually

  //Step 3 - make sure all that info is good info

    //if any of these field are wrong, send a bad data status code, that the front end should tell the user about
    if (firstName === undefined ||
        lastName === undefined){
          res.sendStatus(400);
        }

  //Step 4 - make the connection and then post the new user to the db

  con.connect(function(err) {
    if (err) throw err;
    con.query(`insert into users(FirstName, LastName) values("${firstName}","${lastName}")`, function (err, result, fields) {
      if (err) throw err;
      // console.log('result', result);
    });
  });

  //Step 5 - Listen for a response from the DB
  //          currently there is no logic for error

  //Step 6 - this sends a json response back to the front end as well as a 200 status code
  res.send({'response':'Thanks'}).status(200);

})