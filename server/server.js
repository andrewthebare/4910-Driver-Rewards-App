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
  res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  // if (r.Method == "OPTIONS") {
  //   w.WriteHeader(http.StatusOK)
  //   return
  // }
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
    database: "mydb"
  });
  
  //This actually makes the connection to the DB, then, if it succeeds, makes a query using sql
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM Users", function (err, result, fields) {
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

  //Step 1 - connect to the db
  var con = mysql.createConnection({
    host: "db-prod.cjpjh4cuj9z5.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "Team3Test",
    database: "mydb"
  });
  
  //Step 2 - parse out the info from the message
  //          The JSON payload that we load is found in req.body
  let body = req.body;
  console.log('body', body);

  //js short hand parse out the data submitted from the user
  ({firstName,lastName, username, password, address, email, sponsorKey, type, secureQ1, secureA1, secureQ2, secureA2} = body);

  //Step 3 - make sure all that info is good info - TODO

    //if any of these field are wrong, send a bad data status code, that the front end should tell the user about
    if (firstName === undefined ||
        lastName === undefined){
          res.sendStatus(400);
        }

  //Step 4 - make the connection and then post the new user to the db

  con.connect(function(err) {
    if (err) throw err; 
    con.query(`insert into Users(FirstName, LastName, userType, address, email, sponsorKey, username, hashedPassword, secureQ1, secureA1,secureQ2, secureA2,) 
              values("${firstName}","${lastName}", "${type}","${address}","${email}","${sponsorKey}","${username}", "${password}", "${secureQ1}", "${secureA1}", "${secureQ2}", "${secureA2}")`, 
      
      function (err, result, fields) {
      if (err) throw err;
      console.log('result', result);
    });
  });

  //Step 5 - Listen for a response from the DB
  //          currently there is no logic for error

  //Step 6 - this sends a json response back to the front end as well as a 200 status code
  res.send({'response':'Thanks'}).status(200);

})

app.post('/login',function (req,res){
  console.log('Someone is getting from /login');

  //this creates a connection to the DB
  var con = mysql.createConnection({
    host: "db-prod.cjpjh4cuj9z5.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "Team3Test",
    database: "mydb"
  });

  let body = req.body;
  console.log('body', body);

  let usernameAtmp = body.username;
  let passAtmp = body.password
  // ({usernameAtmp, passAtmp} = body);
  
  //This actually makes the connection to the DB, then, if it succeeds, makes a query using sql
  con.connect(function(err) {
    if (err) throw err;
    con.query(`SELECT * FROM Users WHERE username = "${usernameAtmp}"`, function (err, result, fields) {
      if (err) throw err;
      var string=JSON.stringify(result);
      var json1 = JSON.parse(string);
      //console.log('passAtmp', passAtmp);
      //console.log('result.password', json[0].hashedPassword);
      var realPass = '';
      try {
        var realPass = json1[0].hashedPassword;
      } catch (error) {
        console.error(error);
      }
      
      //console.log('realPass', realPass);
      //({firstName,lastName, username, password, address, email, sponsorKey, type} = results);
      if ( realPass === passAtmp){
        //console.log('in if');
        res.object = json1;
        console.log("res.object: ", res.object);
        res.status(200).json(json1);
        //res.send(`"${json}`);
      }
      else{
        res.sendStatus(300);
        //console.log('in else');
      }
    });
  });

  //This sends a 200 status message that basically tells the front end client that it was done successfully
  //res.send({"hi":"mom"}).status(200);
})


//this collects all post messages sent to <connectionaddress>/newUser
app.post('/Profile/EditProfile',function(req,res){
  console.log('Someone is updating a profile!');

  //Step 1 - connect to the db
  var con = mysql.createConnection({
    host: "db-prod.cjpjh4cuj9z5.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "Team3Test",
    database: "mydb"
  });
  
  //Step 2 - parse out the info from the message
  //          The JSON payload that we load is found in req.body
  let body = req.body;
  console.log('body', body);

  //js short hand parse out the data submitted from the user
  ({UserID, firstName,lastName, username, password, address, email, secureQ1, secureA1, secureQ2, secureA2} = body);

  //Step 3 - make sure all that info is good info - TODO

    //if any of these field are wrong, send a bad data status code, that the front end should tell the user about
    if (UserID === undefined){
          res.sendStatus(400);
        }

  //Step 4 - make the connection and then post the new user to the db

  con.connect(function(err) {
    if (err) throw err; 
    con.query(`UPDATE Users(Deleted, FirstName, LastName, address, email, username, hashedPassword, secureQ1, secureA1,secureQ2, secureA2,) 
              values("${deleted}", "${firstName}","${lastName}", "${type}","${address}","${email}","${sponsorKey}","${username}", "${password}", "${secureQ1}", "${secureA1}", "${secureQ2}", "${secureA2}") WHERE UserID = "${UserID}"`, 
      
      function (err, result, fields) {
      if (err) throw err;
      console.log('result', result);
    });
  });

  //Step 5 - Listen for a response from the DB
  //          currently there is no logic for error

  //Step 6 - this sends a json response back to the front end as well as a 200 status code
  var string=JSON.stringify(result);
  var json1 = JSON.parse(string);
  res.object = json1;
  res.status(200).json(json1);
})