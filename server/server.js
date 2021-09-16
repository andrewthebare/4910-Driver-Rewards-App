var express = require('express');
var mysql = require('mysql');

var app = express();
var fs = require("fs");

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/',function (req,res){

  var con = mysql.createConnection({
    host: "db-prod.cjpjh4cuj9z5.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "Team3Test",
    database: "sys"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM users", function (err, result, fields) {
      if (err) throw err;
      console.log('result', result);
    });
  });

  // console.log(req);
  res.send(200);
})

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
      console.log('result', result);
    });
  });

  res.send({'response':'Thanks'}).status(200);

})