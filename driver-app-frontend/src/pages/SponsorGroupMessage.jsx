import React from "react";
import axios from 'axios';

export default function SponsorGroupMessage(){


  //Basic format for how we talk to the DB
  //This function is called when the submit button is clicked
  const msgGroup = ()=>{
    var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    var message = document.getElementById("message").value;
    var userID = userInfo.UserID;
    var group = userInfo.sponsorKey;
    const mjson = {
      sponsorgroup: group,
      message: message,
      userID: userID
    }
    axios.post('http://localhost:8081/messageGroup',mjson)
  }


  return(
    <div>
      <center>
      <h1> Send Message to Your Entire Sponsor Group </h1>
      <form onSubmit={msgGroup}>
        <label htmlFor="message">Message Body</label>
        <input id='message' type='text'/>
        <br></br>
        <button type='submit'>Submit</button>
      </form>
      </center>
    </div>
  )
}
