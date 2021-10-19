import React from "react";
import axios from 'axios';

export default function SendMessage(){


  //Basic format for how we talk to the DB
  //This function is called when the submit button is clicked
  const onFormSubmit = ()=>{
    var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    var userID = userInfo.UserID;
    let username = document.getElementById("username").value;
    let message = document.getElementById("message").value;

    if (username === '' || message === ''){
      console.warn('NOT ALL FIELDS FILLED OUT');
      return;
    }

    const mjson = {
      username: username,
      message: message,
      userID: userID,
    };


    axios.post('http://localhost:8081/sendMessage', mjson)
    .then(function (response) {
      console.log(response);
      if (response.status === 200){
        alert("Message Sent Success");
      }else{
        alert("Message Sent Fail")
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  return(
    <div>
      <center>
      <h1> Send Message </h1>
      <form onSubmit={onFormSubmit}>

        <label htmlFor="username">User to Send To</label>
        <input id='username' type='text'/>
        <br></br>
        <label htmlFor="message">Message Body</label>
        <input id='message' type='text'/>
        <br></br>
        <button type='submit'>Submit</button>
      </form>
      </center>
    </div>
  )
}
