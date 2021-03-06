var express = require('express');
var mysql = require('mysql');

// enable CORS using npm package
var cors = require('cors');
const axios = require('axios');

var app = express();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();
var fs = require("fs");
const { response, json } = require('express');

//Server Credentials

//Creates the connection
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})

//creates the server connection
var con = mysql.createConnection({
  host: dbHost,
  user: dbuName,
  password: dbpWord,
  database: dbSchema
});

con.connect(function(err) {
  if (err) throw err;
});



//This is necissary to allow json to be passed in our messages
app.use(cors());
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "DELETE, POST, PUT, GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  // if (r.Method == "OPTIONS") {
  //   w.WriteHeader(http.StatusOK)
  //   return
  // }
});

/**
 * Creates an event for a server action
 * @param {*} type which type, see docs.md
 * @param {*} userID Make this the acting user, not the user that is supposedly getting changed (could be the same)
 * @param {JSON} data the data that is associated with the event
 */
let QueryEvent = (type, userID, data)=>{
  console.log('QUERYING');
  console.log('type',type);
  console.log('id',userID);
  console.log('data', data);
  con.query(`INSERT into Event
  SET
  EventType = ${type},
  UserID = ${userID},
  Content = '${JSON.stringify(data)}'`,
  function(err,result,fields){
    console.log('result', result);
    if (err) throw err;
  });
}

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

app.get('/fetchSponsors',function(req,res){
  console.log('Fetching all Sponsors');
  con.query('SELECT * From Sponsor', function (err, result, fields){
    res.send(result).status(200);
  })
})

app.get('/fetchSponsorsUsers', function(req,res){
  console.log('Fetching all users of a Sponsor!');

  let sponsor = req.query.sponsor;

  con.query(`Select username from Users where sponsorKey = ${sponsor}`, function (err, result, fields){
    // console.log(result);
    res.send(result).status(200);
  })
})

app.get('/fetchUsers',function (req,res){
  console.log('Fetching all the Users');

  //this creates a connection to the DB

  //This actually makes the connection to the DB, then, if it succeeds, makes a query using sql
  con.query("SELECT * FROM Users", function (err, result, fields) {
    if (err) throw err;

    //data packet to send back
    let dataPacket = {};

    console.log('result', result);

    //fill up that data packet
    for (i in result){
      let user = result[i];
      dataPacket[i] = {
        firstName:user.FirstName,
        lastName:user.LastName,
        username:user.username,
        userID: user.UserID,
      }
    }

    //send that data packet
    console.log('dataPacket',dataPacket)
    res.send(dataPacket).status(200);
  });

})

app.get('/fetchLogData', function (req,res){
  let logData = JSON.parse( req.query.logData);
  logData.type = logData.type ==='' ? -1 : parseInt(logData.type);
  console.log('logData', logData);



  console.log('Fetching Log Data')
  con.query(`SELECT username, EventID, EventType, Event.UserID, Content, DATE_FORMAT(Date, '%c/%e/%Y %H:%i') Date from Event, Users where Event.UserID = Users.UserID
    and Event.Date >= '${logData.start}'
    AND Event.Date <= '${logData.end}'
    ${logData.type===-1?'':' and Event.EventType = ' + logData.type}
    ${logData.user===''?'':'and Users.username = \"' + logData.user+'\"'}`,
  function (err, result, fields){
    if (err) throw err;

    res.send(result).status(200);
  })
})

app.get('/getCatalogQuery',function(req,res){
  console.log('fetching the catalog query');


  let id = req.query.id;

  con.query(`SELECT CatalogQuery from Sponsor where SponsorID = ?`, [id],
  function (err, result, fields){
    if (err){
      res.sendStatus(500);
      throw err;
    }else{
      console.log('result', result);

      res.send(result[0].CatalogQuery).status(200);
    }


  })
});

app.put('/setCatalogQuery',function(req,res){
  console.log('Setting the catalog query');
  console.log(req.body);

  let body = req.body;
  let stringBody = JSON.stringify(body.data);
  con.query(`UPDATE Sponsor SET CatalogQuery = ? where SponsorID = ?`,[stringBody, body.id],
  function (err, result, fields){
    if (err){
      res.sendStatus(500);
      throw err;
    }else{
      console.log('result', result);

      QueryEvent(20, 0, body.data);
      res.sendStatus(200);
    }
  })
});


app.post('/fetchCatalog', function (req,res){
  let query = req.body.query;
  let price = req.body.price;

  //fetch the default values first
  con.query(`Select CatalogQuery from Sponsor where SponsorID = 0`,
  function (err, result, fields){
    if (err) throw err;


    let options = JSON.parse(result[0].CatalogQuery)

    // options = {
    //   api_key: 'a4w1wj4ed12dov2etkdgmsv8',
    //   includes: 'MainImage',
    //   keywords: 'trucker',
    // };

    options['api_key'] = 'a4w1wj4ed12dov2etkdgmsv8';
    options['includes'] = 'MainImage';

    if(query)
      options['keywords'] = query;
    if(price)
      options['max_price'] = price;

    console.log('options',options)

    //Etsy API Call
  })
})

app.post('/buyItem', function (req,res){
  let item = req.body.item;
  let userID = req.body.user;
  console.log('item', item);

  //get the user's points
  con.query(`Select Points from Users where UserID = ?`,[userID], function(err, result, fields){
    if (err) throw err;
    let pointsBefore = result[0].Points;

    if (pointsBefore >= item.price){
      console.log('valid purchase');

      let pointsAfter = pointsBefore - item.price;

      //update db
      con.query(`Update Users Set Points = ? where UserID= ?`,[pointsAfter, userID], function(err, result, fields){
        console.log(`user ${userID} set to ${pointsAfter}`);

        //defo need to query the sponsor
        console.log(item);
        QueryEvent(40, userID, {'item': {title: item.title, price: item.price}});

        res.send({enough:true}).status(200);
      })
    }
    else{
      QueryEvent(41, userID, {'item': item.JSON});
      res.send({enough:false}).status(200);
    }
  })
})


app.post('/sendMessage', function(req, res){
  console.log('Sending a message');
  let to = req.body.username;
  let message = req.body.message;
  var userID = -1;
  let dt = new Date().toJSON().slice(0, 19).replace('T', ' ');
  let read = 0;
  let starred = 0;
  let from = 0;
  let messageID = 0;
  let senderID = req.body.userID;

  con.query(`SELECT * FROM Users WHERE username = ?`,[to], function(err, result, fields){
    if (err) throw err;
    var string=JSON.stringify(result);
    var json = JSON.parse(string);
    console.log(json);
    try{
      userID = json[0].UserID;
      con.query(`INSERT INTO Message(SenderID, RecipientID, Content, Date) VALUES (?, ?, ?, ?);`,[senderID, json[0].UserID, message, dt],
        function (err, result, fields) {
          if (err) throw err;
          console.log('result', result);
        });
      console.log(userID);
    } catch(error){
      console.error(error);
    }
  });




});



app.post('/sendAlertMessage', function(req, res){
  console.log('Sending a message');
  let to = req.body.username;
  let message = req.body.message;
  let dt = new Date().toJSON().slice(0, 19).replace('T', ' ');
  let read = 0;
  let starred = 0;
  let from = 0;
  let messageID = 0;
  let senderID = 13;

  con.query(`INSERT INTO Message(SenderID, RecipientID, Content, Date) VALUES (?, ?, ?, ?);`,[senderID, to, message, dt],
    function (err, result, fields) {
      if (err) throw err;
      console.log('result', result);
    });




});

app.post('/messageGroup', function(req, res){
  let to = req.body.sponsorgroup;
  let message = req.body.message;
  var userID = -1;
  let dt = new Date().toJSON().slice(0, 19).replace('T', ' ');
  let read = 0;
  let starred = 0;
  let from = 0;
  let messageID = 0;
  let senderID = req.body.userID;

  console.log('messaging group')
  con.query(`SELECT * FROM Users WHERE sponsorKey = ?`,[to], function(err, result, fields){
    if (err) throw err;
    var string=JSON.stringify(result);
    var json = JSON.parse(string);
    console.log(json);
    try{

      for(i in json){
        con.query(`INSERT INTO Message(SenderID, RecipientID, Content, Date) VALUES (?, ?, ?, ?);`,[senderID, json[i].UserID, message, dt],
          function (err, result, fields) {
            if (err) throw err;
            console.log('result', result);
          });
      }

      console.log(userID);
    } catch(error){
      console.error(error);
    }
  });
})




app.patch('/markStarred',function(req,res){
  let id = req.body.messageId;
  console.log(id);
  con.query(`UPDATE Message SET Starred = '1' WHERE (messageID = ?);`,[id], function(err, result, fields){
    if (err) throw err;
    console.log(id);
  });
})

app.patch('/markRead',function(req,res){
  let id = req.body.messageId;
  console.log(id);
  con.query(`UPDATE Message SET Unread = '0' WHERE (messageID = ?);`,[id], function(err, result, fields){
    if (err) throw err;
    console.log(id);
  });
})

app.patch('/deleteMsg',function(req,res){
  let id = req.body.messageId;
  console.log('deleting message');
  con.query(`DELETE FROM Message WHERE (messageID = ?);`,[id], function(err, result, fields){
    if (err) throw err;
    console.log(id);
  });
})



app.post('/showAll',function (req,res){
  console.log('Loading All Messages');
  let id = req.body.userID;
  //this creates a connection to the DB
  //This actually makes the connection to the DB, then, if it succeeds, makes a query using sql
  con.query(`SELECT * FROM Message WHERE RecipientID = ? ORDER BY Date`,[id], function (err, result, fields) {
    if (err) throw err;

    //data packet to send back
    let dataPacket = [];


    //fill up that data packet
    for (i in result){
      let msg = result[i];
      let data = {
        messageID:msg.messageID,
        SenderID:msg.SenderID,
        RecipientID:msg.RecipientID,
        Content:msg.Content,
        Unread:msg.Unread,
        Starred:msg.Starred,
        Date:msg.Date,
      }
      dataPacket.push(data);
    }

    res.send(dataPacket).status(200);
  });

})


app.post('/showStarred',function (req,res){
  console.log('Loading All Starred Messages');
  let id = req.body.userID;
  //this creates a connection to the DB

  //This actually makes the connection to the DB, then, if it succeeds, makes a query using sql
  con.query(`SELECT * FROM Message WHERE (RecipientID = ? AND Starred = 1);`, [id], function (err, result, fields) {
    if (err) throw err;

    //data packet to send back
    let dataPacket = [];

    console.log('result', result);

    //fill up that data packet
    for (i in result){
      let msg = result[i];
      let data = {
        messageID:msg.messageID,
        SenderID:msg.SenderID,
        RecipientID:msg.RecipientID,
        Content:msg.Content,
        Unread:msg.Unread,
        Starred:msg.Starred,
        Date:msg.Date,
      }
      dataPacket.push(data);
    }

    //send that data packet
    console.log('dataPacket',dataPacket)
    res.send(dataPacket).status(200);
  });

})


app.get('/showUnread',function (req,res){
  console.log('Loading All Unread Messages');
  let id = req.body.userID;
  //this creates a connection to the DB

  //This actually makes the connection to the DB, then, if it succeeds, makes a query using sql
  con.query(`SELECT * FROM Message WHERE (RecipientID = ? AND Unread = 1);`,[id], function (err, result, fields) {
    if (err) throw err;

    //data packet to send back
    let dataPacket = [];

    console.log('result', result);

    //fill up that data packet
    for (i in result){
      let msg = result[i];
      let data = {
        messageID:msg.messageID,
        SenderID:msg.SenderID,
        RecipientID:msg.RecipientID,
        Content:msg.Content,
        Unread:msg.Unread,
        Starred:msg.Starred,
        Date:msg.Date,
      }
      dataPacket.push(data);
    }

    //send that data packet
    console.log('dataPacket',dataPacket)
    res.send(dataPacket).status(200);
  });

})



app.post('/showSponsorGroup',function (req,res){
  console.log('Loading All Drivers in Sponsor Group');
  console.log(req.body);
  let key = req.body.sponsorKey;
  //this creates a connection to the DB
  //This actually makes the connection to the DB, then, if it succeeds, makes a query using sql
  con.query(`SELECT * FROM Users WHERE (sponsorKey = ? AND userType = 2)`,[key], function (err, result, fields) {
    if (err) throw err;

    //data packet to send back
    let dataPacket = [];


    //fill up that data packet
    for (i in result){
      let usr = result[i];
      let data = {
        UserID:usr.UserID,
        FirstName:usr.FirstName,
        LastName:usr.LastName,
        Username:usr.username,
        Points:usr.Points,
      }
      dataPacket.push(data);
    }
    console.log(dataPacket);
    res.send(dataPacket).status(200);
  });

})

app.patch('/addPoints',function(req,res){
  let id = req.body.userID;
  let pts = req.body.points;
  let sp = req.body.sponsor;
  console.log(req.body.actor);
  con.query(`UPDATE Users SET Points = Points + ? WHERE (UserID = ? AND sponsorKey = ?)`,[pts, id, sp], function(err, result, fields){
    if(err) throw err;
  })
  QueryEvent(30, req.body.actor, req.body);
})

app.patch('/removePoints',function(req,res){
  let id = req.body.userID;
  let pts = req.body.points;
  let sp = req.body.sponsor;
  con.query(`UPDATE Users SET Points = Points - ? WHERE (UserID = ? AND sponsorKey = ?)`,[pts, id, sp], function(err, result, fields){
    if(err) throw err;
  })
  QueryEvent(31, req.body.actor, req.body);
})

app.post('/removeDriver', function(req, res){
  let driver = req.body.username;
  let sponsor = req.body.sponsorKey;
  con.query(`DELETE FROM Users WHERE (username = ? AND sponsorKey = ?)`,[to, sponsor], function(err, result, fields){
    if (err) throw err;
  });
});




app.post('/oneUser',function (req,res){
  console.log('Fetching one user');

  //make sure a user there to be fetched
  let userID = req.body.userID;

  con.query(`SELECT * FROM Users WHERE UserID = ?`,[userID], function (err, result, fields) {
    if (err) throw err;
    console.log('result', result);
    res.send(result[0]).status(200);
  });




})

app.post('/updateUser',function (req,res){
  console.log('Updating USER');

  let success = false;

  let body = req.body;
  console.log('body', body);
  ({UserID, firstName, lastName, username, password, address, email, sponsorKey, userType, secureQ1, secureA1, secureQ2, secureA2} = body);


  con.query(`Update Users
  set FirstName =?, LastName = ?, username = ?, hashedPassword = ?, address = ?, email = ?, userType = ?
  where UserID = ?;`,[firstName, lastName, username, password, address, email, userType, UserID],
  function (err, result, fields) {
    if (!err){
      console.log('result',result)
      res.sendStatus(200);
      QueryEvent(1,UserID,body);
    }
    else{
      res.sendStatus(400);
    }
    if (err) throw err;
});

})


//this collects all post messages sent to <connectionaddress>/newUser
app.post('/newUser',function(req,res){
  console.log('Someone is posting a new user!');

  //Step 1 - connect to the db

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

  con.query(`insert into Users(FirstName, LastName, userType, address, email, sponsorKey, username, hashedPassword)
            values(?,?, ?,?,?,?,?, ?)`,[firstName, lastName, type, address, email, sponsorKey, username, password],

    function (err, result, fields) {
    if (err) throw err;
    console.log('result', result);

    //Step 5 - Listen for a response from the DB
    //          currently there is no logic for error

    QueryEvent(0, result.insertId, body)
    //Step 6 - this sends a json response back to the front end as well as a 200 status code
    res.send({'response':'Thanks'}).status(200);
  });
})

app.post('/SponsorAddSponsor',function(req,res){
  console.log('Sponsor is making a new sponsor');

  //Step 1 - connect to the db

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

  con.query(`insert into Users(FirstName, LastName, userType, address, email, sponsorKey, username, hashedPassword)
            values(?,?, ?,?,?,?,?, ?)`,[firstName, lastName, type, address, email, sponsorKey, username, password],

    function (err, result, fields) {
    if (err) throw err;
    console.log('result', result);

    //Step 5 - Listen for a response from the DB
    //          currently there is no logic for error

    QueryEvent(0, result.insertId, body)
    //Step 6 - this sends a json response back to the front end as well as a 200 status code
    res.send({'response':'Thanks'}).status(200);
  });
})

app.post('/login',function (req,res){
  console.log('Someone is getting from /login');

  let body = req.body;
  console.log('body', body);

  let usernameAtmp = body.username;
  let passAtmp = body.password;
  let sponsorKey = body.sponsorKey;
  // ({usernameAtmp, passAtmp} = body);
  // var string1;
  // var json1;
  // var string2;
  // var json2;

  //This actually makes the connection to the DB, then, if it succeeds, makes a query using sql
  con.query(`SELECT * FROM Users WHERE username = ? AND sponsorKey = ?`, [usernameAtmp, sponsorKey], function (err, result, fields) {
    var string1;
    var json1;
    var string2;
    var json2;
    if (typeof result[0]!== "undefined"){
    console.log("early results: ", result[0]);
    string1=JSON.stringify(result[0]);
    json1 = JSON.parse(string1);
    console.log('json1:', json1);
    //console.log('result.password', json[0].hashedPassword);
    var realPass = '';
    try {
      var realPass = json1.hashedPassword;
    } catch (error) {
      console.error(error);
    }

    //console.log('realPass', realPass);
    //({firstName,lastName, username, password, address, email, sponsorKey, type} = results);
    if ( realPass === passAtmp){

      QueryEvent(10,json1.UserID,{})
      con.query(`SELECT * FROM Settings WHERE UserID = ?`,[json1.UserID],
        function (err, result, fields) {
          console.log("look at this", typeof result[0]);
          if (typeof result[0]== 'undefined') {
            console.log("No existing settings");
            json2 = {
              "displayMode": 0,
              "2stepAuth": 0,
              "SecurityQuestion1": " ",
              "SecurityQuestion2": " ",
              "SecurityAnswer1": " ",
              "SecurityAnswer2": " ",
              "SecurityQuestionsLogin": 0,
              "BlockedUsers": [],
              "FontSize": 1,
              "EmailNotifications": 0,
              "SaveBills": 12,
              "SaveOrders": 12
            }
          }

          else if(!err){
            console.log("inside here");
            string2=JSON.stringify(result[0]);
            console.log("result value: ", result[0]);
            json2 = JSON.parse(string2);
          }
          console.log("json2 value = ", json2);
          const json3 = {
            ...json1,
            ...json2
          };

          console.log("json3 value: ", json3);
          res.object = json3;
          console.log("res.object: ", res.object);
          res.status(200).json(json3)
      });
    }
    else{
      QueryEvent(11,json1.UserID,{})
      res.sendStatus(300);
      //console.log('in else');
    }
  }
  else if(typeof result[0] == "undefined"){
    console.log("didnt find a match");
    res.sendStatus(300);
  }
  });

  //This sends a 200 status message that basically tells the front end client that it was done successfully
  //res.send({"hi":"mom"}).status(200);
})


//this collects all post messages sent to <connectionaddress>/newUser
app.post('/Profile/EditProfile',function(req,res){
  console.log('Someone is updating a profile!');

  //Step 1 - connect to the db

  //Step 2 - parse out the info from the message
  //          The JSON payload that we load is found in req.body
  let body = req.body;
  console.log('body', body);

  //js short hand parse out the data submitted from the user
  ({UserID, firstName,lastName, username, password, address, email, deleted} = body);
  //console.log("////////////value of delteded is:", deleted);
  //Step 3 - make sure all that info is good info - TODO

    //if any of these field are wrong, send a bad data status code, that the front end should tell the user about
    if (UserID === undefined){
          res.sendStatus(400);
        }

  //Step 4 - make the connection and then post the new user to the db
  if(deleted === 1){
    console.log("////////////////////deleting account////////////////");
    con.query(`DELETE FROM Users WHERE (UserID = ?);`,[UserID], function(err, result, fields){
      if (err) throw err;
      console.log("succesfull delete");
      res.sendStatus(200);
    });
  }
  else{
  con.query(`Update Users
  set FirstName = ?, LastName = ?, username = ?, hashedPassword = ?, address = ?, email = ?
  where UserID = ?;`,[firstName, lastName, username, password, address, email, UserID],



  // con.query(`UPDATE Users(Deleted, FirstName, LastName, address, email, username, hashedPassword)
  //           values("${deleted}", "${firstName}","${lastName}","${address}","${email}","${username}", "${password}") WHERE UserID = "${UserID}"`,

    function (err, result, fields) {
      if (!err){
        console.log('result',result)
        //res.sendStatus(200);
        QueryEvent(1,UserID,body);
        var string=JSON.stringify(result);
        var json1 = JSON.parse(string);
        res.object = json1;
        res.status(200).json(json1);
      }
      else{
        res.sendStatus(400);
      }
      if (err) throw err;
    // if (err) throw err;
    // console.log('result', result);
    // var string=JSON.stringify(result);
    // var json1 = JSON.parse(string);
    // res.object = json1;
    // res.status(200).json(json1);

  });

}
  //Step 5 - Listen for a response from the DB
  //          currently there is no logic for error

  //Step 6 - this sends a json response back to the front end as well as a 200 status code

})


app.post('/applicationUpdate',function (req,res){
  console.log('Updating Application');

  let body = req.body;
  let stringBody = JSON.stringify(body);

  console.log('body', body);
  ({SponsorID, q1, q2, q3, q4, q5, q6, q6, q8, q9, q10} = body);

  con.query(`UPDATE Sponsor SET Application = '${stringBody}' WHERE SponsorID = ${SponsorID}`,
  function (err, result, fields) {
    if (!err){
      console.log('result',result)

      res.sendStatus(200);
      QueryEvent(1,SponsorID,body);
    }
    else{
      res.sendStatus(400);
    }
    if (err) throw err;
});
})

app.post('/applicationSubmit',function (req,res){
  console.log('Submittting Application');

  let body = req.body;
  let stringBody = JSON.stringify(body);

  console.log('body', body);
  ({SponsorID, DriverID, q1, q2, q3, q4, q5, q6, q6, q8, q9, q10} = body);

  con.query(`SELECT * FROM Applications WHERE SponsorID = ${SponsorID} AND UserID = ${DriverID}`, function(err, results, fields) {
    if (results.length === 0)
    {
        con.query(`INSERT INTO Applications VALUES(${SponsorID},${DriverID},'${stringBody}')`,
          function (err, result, fields) {
            if (!err){
              console.log('result',result)

              res.sendStatus(200);
              QueryEvent(1,SponsorID,body);
            }
            else{
              res.sendStatus(400);
            }
            if (err) throw err;
        })
    }
  })

});

app.get('/fetchQuestions',function (req,res){
  console.log('Pulling Questions Down');
  let sponsID = req.query.SponsorID;
  con.query(`SELECT 1 FROM Sponsor WHERE SponsorID = ${sponsID}`, function (err, result, fields) {
    if (err) throw err;
    if (result.length === 0)
    {
      res.sendStatus(400)
    }
    else
    {
      con.query(`SELECT Application FROM Sponsor WHERE SponsorID = ${sponsID}`, function (err, result, fields) {
        let ezResult = JSON.parse(result[0].Application)
        console.log('Result', ezResult)

        res.send(ezResult).status(200);
      })
    }


  });

})






app.get('/fetchApplication',function (req,res){
  console.log('Pulling Application Down');
  let sponsID = req.query.SponsorID;
  con.query(`SELECT * FROM Sponsor WHERE SponsorID = ${sponsID}`, function (err, result, fields) {
    if (err) throw err;
    if (result.length === 0)
    {
      res.sendStatus(400)
    }
    else
    {
      con.query(`SELECT * FROM Applications WHERE SponsorID IN (${sponsID})`, function (err, result, fields) {

        console.log('Result', result)

        res.send(result).status(200);
      })
    }


  });

})

app.post('/approveApplication',function (req,res){
  console.log('Approving Application');
  let body = req.body;
  console.log('body', body);

  ({SponsorID, UserID} = body);
  con.query(`Update Applications SET Accepted = 1 WHERE SponsorID = ${SponsorID} AND UserID = ${UserID}`, function (err, result, fields) {
    if (!err){
      console.log('result',result)
      res.sendStatus(200);
    }
    else{
      res.sendStatus(400);
    }
    if (err) throw err;
  });

})

app.post('/denyApplication',function (req,res){
  console.log('Denying Application');
  let body = req.body;
  console.log('body', body);

  ({SponsorID, UserID} = body);
  con.query(`Update Applications SET Accepted = 2 WHERE SponsorID = ${SponsorID} AND UserID = ${UserID}`, function (err, result, fields) {
    if (!err){
      console.log('result',result)
      res.sendStatus(200);
    }
    else{
      res.sendStatus(400);
    }
    if (err) throw err;
  });

})





app.post('/resetPassword',function(req,res){
  console.log('Changing password');
  let q = req.body.q;
  let username = req.body.username;
  let ans = req.body.ans;
  let newpw = req.body.newpw;
  con.query(`SELECT * FROM Users WHERE username = ?`, [username],
    function(err, result, fields){
      if(err) throw err;
      else{
        var string1=JSON.stringify(result[0]);
        var json1 = JSON.parse(string1);
        con.query(`SELECT * FROM Settings WHERE UserID = ${json1.UserID}`,
        function(err, result, fields){
          if(err) throw err;
          else{
            var string2=JSON.stringify(result[0]);
            var json2 = JSON.parse(string2);
            if((json2.SecurityQuestion1 == q && json2.SecurityAnswer1) || (json2.SecurityQuestion2 == q && json2.SecurityAnswer2)){
              con.query(`UPDATE Users SET hashedPassword = ? WHERE UserID = ?`, [newpw, json1.UserID],
              function(err, result, fields){
                if(err) throw err;
              }
            )
            }
          }
        }
      )

      }
    }


  )



})

app.post('/getSecQuestion', function(req, res){
  let username = req.body.username;
  console.log(username);
  con.query(`SELECT * FROM Users WHERE username = ?`, [username],
    function(err, result, fields){
      if(err) throw err;
      else{
        var string1=JSON.stringify(result[0]);
        var json1 = JSON.parse(string1);
        con.query(`SELECT * FROM Settings WHERE UserID = ${json1.UserID}`,
        function(err, result, fields){
          if(err) throw err;
          else{
            res.send(result).status(200);
          }
        }
      )

      }
    }


  )



})



app.post('/SecurityQuestions',function(req,res){
  console.log('Someone is adding security questions!');

  //Step 1 - connect to the db

  //Step 2 - parse out the info from the message
  //          The JSON payload that we load is found in req.body
  let body = req.body;
  console.log('body', body);

  //js short hand parse out the data submitted from the user
  ({userID, secureQ1, secureA1, secureQ2, secureA2} = body);

  //Step 3 - make sure all that info is good info - TODO


  //Step 4 - make the connection and then post the new user to the db

  con.query(`SELECT * FROM Settings userID = "${userID}"`,
    function (err, result, fields) {
    if (err) {
      con.query(`insert into Settings(UserID, SecurityQuestion1, SecurityQuestion2, SecurityAnswer1, SecurityAnswer2)values("${userID}","${secureQ1}", "${secureQ2}","${secureA1}","${secureA2}")`,

      function (err, result, fields) {
      if (err) throw err;
      console.log('result for insert', result);

      //Step 5 - Listen for a response from the DB
      //          currently there is no logic for error

      //QueryEvent(0, result.insertId, body)
      //Step 6 - this sends a json response back to the front end as well as a 200 status code
      res.send({'response':'Thanks'}).status(200);
    });
  }
  else if(!err){
    con.query(`Update Settings
    set SecurityQuestion1 ="${secureQ1}", SecurityQuestion2 = "${secureQ2}", SecurityAnswer1 = "${secureA1}", SecurityAnswer2 = "${secureA2}"
    where UserID = ${userID};`,

      function (err, result, fields) {
      if (err) throw err;
      console.log('result for update', result);

      //Step 5 - Listen for a response from the DB
      //          currently there is no logic for error

      //QueryEvent(0, result.insertId, body)
      //Step 6 - this sends a json response back to the front end as well as a 200 status code
      res.send({'response':'Thanks'}).status(200);
    });
  }
  });
})


app.post('/Settings',function(req,res){
  console.log('Someone is updating their Settings!');

  //Step 1 - connect to the db

  //Step 2 - parse out the info from the message
  //          The JSON payload that we load is found in req.body
  let body = req.body;
  console.log('body', body);


  //js short hand parse out the data submitted from the user
  ({UserID, font,darkTheme, securityQ, twostep, emailNote, preBill, preOrder} = body);

  //Step 3 - make sure all that info is good info - TODO

    //if any of these field are wrong, send a bad data status code, that the front end should tell the user about
    if (UserID === undefined){
          res.sendStatus(400);
        }

  //Step 4 - make the connection and then post the new user to the db
  con.query(`SELECT * FROM Settings where UserID = "${UserID}"`,
  function (err, result, fields) {
  if (err) {
    con.query(`insert into Settings(UserID, FontSize,displayMode, SecurityQuestionsLogin, twostepAuth, EmailNotifications, SaveBills, SaveOrders )values("${UserID}","${font}","${darkTheme}", "${securityQ}", "${twostep}", "${emailNote}", "${preBill}", "${preOrder}")`,

    function (err, result, fields) {
    if (err) throw err;
    console.log('result for insert', result);

    //Step 5 - Listen for a response from the DB
    //          currently there is no logic for error

    //QueryEvent(0, result.insertId, body)
    //Step 6 - this sends a json response back to the front end as well as a 200 status code
    res.send({'response':'Thanks'}).status(200);
  });
}
else if(!err){
  con.query(`Update Settings set FontSize ="${font}", displayMode = "${darkTheme}", SecurityQuestionsLogin = "${securityQ}", twostepAuth = "${twostep}", EmailNotifications = "${emailNote}", SaveBills = "${preBill}", SaveOrders = "${preOrder}" where UserID = "${UserID}";`,

    function (err, result, fields) {
      if (!err){
        console.log('result',result)
        //res.sendStatus(200);
        QueryEvent(1,UserID,body);
        var string=JSON.stringify(result);
        var json1 = JSON.parse(string);
        console.log("json1 = ", json1);
        res.object = json1;
        res.status(200).json(json1);
      }
      else{
        res.sendStatus(400);
      }
      if (err) throw err;
    // if (err) throw err;
    // console.log('result', result);
    // var string=JSON.stringify(result);
    // var json1 = JSON.parse(string);
    // res.object = json1;
    // res.status(200).json(json1);

  });

}

  //Step 5 - Listen for a response from the DB
  //          currently there is no logic for error

  //Step 6 - this sends a json response back to the front end as well as a 200 status code

})
})
