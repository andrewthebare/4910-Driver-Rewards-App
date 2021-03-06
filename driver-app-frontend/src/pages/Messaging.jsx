import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import './Messaging.css';
import axios from 'axios';


class EmailList extends React.Component{
  render(){
    var email_list = this.props.emails.map(function(mail) {
      return (
        <EmailListItem key={mail.messageID}
                       id={mail.messageID}
                       from={mail.SenderID}
                       to={mail.RecipientID}
                       body={mail.Content}
                       read={mail.Starred}
                       date={mail.Date}/>
      );
    }.bind(this));

    return (
      <table className="email-list">
        <thead>
          <tr>
            <th> ID </th>
            <th>Date</th>
            <th>From</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {email_list}
        </tbody>
      </table>
    );
  }
}


class EmailListItem extends React.Component{
  render(){
    return (
      <tr>
        <td> {this.props.id}</td>
        <td>{this.props.date}</td>
        <td>{this.props.from}</td>
        <td>{this.props.body}</td>
      </tr>
    );
  }
}






export default function Messaging(){

  const [msgs, setMsgs] = useState([]);
  const [msgData, setMsgData]=useState({
    messageID:0,
    SenderID:0,
    RecipientID:0,
    Content:'',
    Read:0,
    Starred:0,
  })


  const showAll = ()=>{
    var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    var userID = userInfo.UserID;
    const mjson = {
      userID: userID,
    };
    axios.post('http://localhost:8081/showAll', mjson)
    .then((response) => {
      setMsgs(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  }

  const showStarred = ()=>{
    var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    var userID = userInfo.UserID;
    const mjson = {
      userID: userID,
    };
    axios.post('http://localhost:8081/showStarred', mjson)
    .then(function (response) {
      setMsgs(response.data);
      console.log(msgs);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const showUnread = ()=>{
    var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    var userID = userInfo.UserID;
    const mjson = {
      userID: userID,
    };
    axios.post('http://localhost:8081/showUnread', mjson)
    .then(function (response) {
      setMsgs(response.data);
      console.log(msgs);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const populateIDList= () =>{
    let options = [];
    options.push(<option value='empty'>Select A Message</option>)

    for (let i in msgs){
      options.push(<option value={msgs[i].messageID}>{`${msgs[i].messageID}`}</option>)
    }

    return options;
  }
  const markRead = ()=>{
    let mid = document.getElementById("msgSelect").value;
    const mjson = {
      messageId: mid,
    }
    console.log(mjson);
    axios.patch('http://localhost:8081/markRead', mjson)
  }

  const markStarred = ()=>{
    let mid = document.getElementById("msgSelect").value;
    const mjson = {
      messageId: mid,
    }
    console.log(mjson);
    axios.patch('http://localhost:8081/markStarred', mjson)
  }

  const deleteMsg = ()=>{
    let mid = document.getElementById("msgSelect").value;
    const mjson = {
      messageId: mid,
    }
    console.log(mjson);
    axios.patch('http://localhost:8081/deleteMsg', mjson)
  }
  var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  var driver = false;
  var userType = 3;
  userType = userInfo.userType;
  if(userType === 2 || userType === 1 || userType === 0){
    driver = true;
  }
    return(

      <div>
      <center>

      {driver && <button type='submit' className = "btn1" onClick={showAll}>Show All</button>}
      {driver && <button type='submit' className = "btn1" onClick={showStarred}>Show Starred</button>}
      {driver &&<button type='submit' className = "btn1" onClick={showUnread}>Show Unread</button>}
      <br></br>
      {driver &&<button>
        <Link class="nav-link" to="/SendMessage">
          Send Message
          <span class="sr-only">(current)</span>
        </Link>
      </button>}
      {driver &&<button>
        <Link class="nav-link" to="/SponsorGroupMessage">
          Message Group
          <span class="sr-only">(current)</span>
        </Link>
      </button>}
      </center>
        {driver &&<EmailList emails={msgs} />}
      <center>
      <br></br>
      {driver &&<select id="msgSelect">
        {populateIDList()}
      </select>}
      <br></br>
      {driver &&<button onClick = {markRead}> Mark As Read</button>}
      {driver &&<button onClick = {markStarred}> Mark As Starred</button>}
      {driver && <button onClick = {deleteMsg}> Delete Message</button>}
      <br></br>
       You can turn on read receipts in the settings part of your profile
      </center>
      </div>
    )
  }
