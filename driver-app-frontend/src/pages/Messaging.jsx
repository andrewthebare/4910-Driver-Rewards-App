import React from "react";
import { Link, withRouter } from "react-router-dom";
import './Messaging.css';

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
        <EmailListItem key={mail.id}
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








var test = [
  {
    id: 1,
    from: "test2@email.com",
    to: "test@email.com",
    date: "9/26/2020",
    body: "hi",
    read: "True"
  },
  {
    id: 2,
    from: "test3@email.com",
    to: "test@email.com",
    date: "9/27/2021",
    body: "hello",
    read: "False"
  }
];

export default function Messaging(){
    return(

      <div>
      <center>
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
        <EmailList emails={test} />
      </div>
    )
  }
