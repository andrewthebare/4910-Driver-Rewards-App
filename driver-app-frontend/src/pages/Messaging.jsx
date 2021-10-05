import React from "react";
import { Link, withRouter } from "react-router-dom";
import './Messaging.css';
import axios from 'axios';

class Email extends React.Component{
  render(){
    return(
      <div className="email">
        <dl className="meta dl-horizontal">
          <dt>From</dt>
          <dd>{this.props.from}</dd>

          <dt>To</dt>
          <dd>{this.props.to}</dd>

        </dl>
        <div>
          <p> {this.props.body}</p>
        </div>
      </div>
    );
  }
}


class EmailList extends React.Component{
  render(){
    var email_list = this.props.emails.map(function(mail) {
      return (
        <EmailListItem key={mail.to}
                       from={mail.from}
                       to={mail.to}
                       body={mail.body}
                       read={mail.read}
                       date={mail.date}/>
      );
    }.bind(this));

    return (
      <table className="email-list table table-striped table-condensed">
        <thead>
          <tr>
            <th>Date</th>
            <th>From</th>
            <th>Body</th>
            <th>Read</th>
            <th> Starred</th>
            <th> Delete</th>
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
        <td>{this.props.date}</td>
        <td>{this.props.from}</td>
        <td>{this.props.body}</td>
        <td><button>{this.props.read}</button></td>
        <td><button> * </button></td>
        <td><button> X </button></td>
      </tr>
    );
  }
}






export default function Messaging(){

  let msgs = [];

  const showAll = ()=>{
    msgs = [];
    axios.get('http://localhost:8081/showAll')
    .then((response) => {
      for (var i in response.data){
        let msg = response.data[i];
        let data = {
          messageID:msg.messageID,
          SenderID:msg.SenderID,
          RecipientID:msg.RecipientID,
          Content:msg.Content,
          Read:msg.Read,
          Starred:msg.Starred,
        }
        msgs.push(data);
      }
      console.log(msgs);
    })
    .catch(function (error) {
      console.error(error);
    });
    console.log(msgs);
  }

  const showStarred = ()=>{
    msgs = [];
    axios.get('http://localhost:8081/showStarred')
    .then(function (response) {
      for (var i in response.data){
        let msg = response.data[i];
        let data = {
          messageID:msg.messageID,
          SenderID:msg.SenderID,
          RecipientID:msg.RecipientID,
          Content:msg.Content,
          Read:msg.Read,
          Starred:msg.Starred,
        }
        msgs.push(data);
      }
      console.log(msgs);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const showUnread = ()=>{
    msgs = [];
    axios.get('http://localhost:8081/showUnread')
    .then(function (response) {
      for (var i in response.data){
        let msg = response.data[i];
        let data = {
          messageID:msg.messageID,
          SenderID:msg.SenderID,
          RecipientID:msg.RecipientID,
          Content:msg.Content,
          Read:msg.Read,
          Starred:msg.Starred,
        }
        msgs.push(data);
      }
      console.log(msgs);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
    return(

      <div>
      <center>
      <button type='submit' onClick={showAll}>Show All</button>
      <button type='submit' onClick={showStarred}>Show Starred</button>
      <button type='submit' onClick={showUnread}>Show Unread</button>
      <br></br>
      <button>
        <Link class="nav-link" to="/SendMessage">
          Send Message
          <span class="sr-only">(current)</span>
        </Link>
      </button>
      <button>
        <Link class="nav-link" to="/SponsorGroupMessage">
          Message Group
          <span class="sr-only">(current)</span>
        </Link>
      </button>
      </center>
        <EmailList emails={msgs} />
      </div>
    )
  }
