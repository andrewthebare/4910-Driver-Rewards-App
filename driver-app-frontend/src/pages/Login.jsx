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
    
    //Empty inputs are stopped here
    var error = document.getElementById("error")
    if (document.getElementById("Username").value === '' || document.getElementById("Password").value === '') 
    {
        error.textContent = "Please fill out all fields"
        error.style.color = "red"
        return;
    } else {
        error.textContent = ""
    }
    //Source: GfG "Error message w/o alert box"

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
   })
   .catch(function (error) {   //Error catch and Statement
    var error = document.getElementById("error")
    error.textContent = "Incorrect Username or Password"
    error.style.color = "red"
    console.log(error);
   });
  }

  return(    
    <div>
      <h3>Login</h3>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="Username">Username</label>
	      <input id='Username' type='text'/>
	      <label htmlFor="Password"> Password </label>
	      <input id='Password' type='password'/>
        <br /><span id="error"></span>
	      {/* <button onClick={redirect}>Login</button> */}
      </form>   
      <button onClick={redirect}>Login</button>
   </div>     
  )
}