import React from 'react';
import axios from 'axios';
import { Link, withRouter } from "react-router-dom";
import './Login.css';
export default function Login(){
   const onFormSubmit = ()=>{

  }
  function redirect() {
    //Step 1 - Make sure that all the necissary fields are filled out
    let username = document.getElementById("Username").value;
    let password = document.getElementById("Password").value;
    console.log(username);
    console.log(password);

    //empty inputs should get stopped here, let the server figure out more complex errors like accounts already existing
    if (username === '' || password === ''){
      //tell the user to try again

      return;
    }

    //Step 2 - Send the data along to the server
    //load up a json object with our data that we're sending
    const loginAttempt = {
      username: username,
      password: password,
   }
   //post it to the server
   axios.post('http://localhost:8081/login', loginAttempt)
   .then(function (response) { //this part waits and plays out when a response is recieved, it's asynchronous
     console.log("response is:", response);
     var result = response.data[0];
     console.log("object:", result);
     if (response.status === 200){
       sessionStorage.setItem("userInfo", JSON.stringify(result));
       //console.log("test: ", test);
       alert("Successful login");
       window.location.replace("/Profile");
     }
     if(response.status === 300){
       console.log("in here");
      window.location.replace("/Login");
     }
   })
   .catch(function (error) {   //this part catches errors
     console.log(error);
   });
  }

  return(
    <div>
      <center>
      <h1>Login</h1>
      <br></br>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="Username">Username </label>
        <br></br>
	      <input id='Username' type='text'/>
        <br></br>
	      <label htmlFor="Password"> Password </label>
        <br></br>
	      <input id='Password' type='text'/>
        <br></br>
	      {/* <button onClick={redirect}>Login</button> */}
      </form>
      <button class="loginButton" onClick={redirect}>Login</button>
      </center>
   </div>
  )
}
