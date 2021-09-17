import React from 'react';
import axios from 'axios';
import { Link, withRouter } from "react-router-dom";

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
   window.location.replace("/Profile")
  }

  return(    
    <div>
      <h3>Login</h3>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="Username">Username</label>
	      <input id='Username' type='text'/>
	      <label htmlFor="Password"> Password </label>
	      <input id='Password' type='text'/>
	      {/* <button onClick={redirect}>Login</button> */}
      </form>   
      <button onClick={redirect}>Login</button>
   </div>     
  )
}