import React from "react";
import axios from 'axios';

export default function SponsorGroupMessage(){


  //Basic format for how we talk to the DB
  //This function is called when the submit button is clicked
  const onFormSubmit = ()=>{
  //
  //   let username = document.getElementById("username").value;
  //   let message = document.getElementById("message").value;
  //
  //
  //   if (username === '' || message === ''){
  //     console.warn('NOT ALL FIELDS FILLED OUT');
  //
  //     return;
  //   }
  //
  //   const mjson = {
  //     username: username,
  //     message: message,
  //   };
  //
  //
  //   axios.post('http://localhost:8081/sendMessage', mjson)
  //   .then(function (response) {
  //     console.log(response);
  //     if (response.status === 200){
  //       alert("Message Sent Success");
  //     }else{
  //       alert("Message Sent Fail")
  //     }
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  //
  }

  return(
    <div>
      <center>
      <h1> Send Message to Your Entire Sponsor Group </h1>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="message">Message Body</label>
        <input id='message' type='text'/>
        <br></br>
        <button type='submit'>Submit</button>
      </form>
      </center>
    </div>
  )
}
