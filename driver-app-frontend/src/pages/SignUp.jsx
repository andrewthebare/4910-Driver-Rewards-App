import React from "react";
import axios from 'axios';

export default function SponsorAddSponsor(){

  //infrastructure function that just fetches the DB


  /**
   * This is a very simple example of how we're going to talk to the DB
   * This function is called when I click on the Add Fred Flinstone button
   */
   function polynomialRollingHash(str)
   {

     // P and M
     let p = 31;
     let m = (1e9 + 9);
     let power_of_p = 1;
     let hash_val = 0;

     // Loop to calculate the hash value
     // by iterating over the elements of String
     for(let i = 0; i < str.length; i++)
     {
         hash_val = (hash_val + (str[i].charCodeAt() -
                     'a'.charCodeAt() + 1) * power_of_p) % m;
         power_of_p = (power_of_p * p) % m;
     }
     return hash_val;
   }
  //Basic format for how we talk to the DB
  //This function is called when the submit button is clicked
  const onFormSubmit = ()=>{
    //Step 1 - Make sure that all the necissary fields are filled out
    let firstName = document.getElementById("FirstName").value;
    let lastName = document.getElementById("LastName").value;
    let type = 2;
    let sponsor = 100;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // let secureQ1 = document.getElementById("Security Question 1").value;
    // let secureA1 = document.getElementById("Security Answer 1").value;
    // let secureQ2 = document.getElementById("Security Question 2").value;
    // let secureA2 = document.getElementById("Security Answer 2").value;

    //empty inputs should get stopped here, let the server figure out more complex errors like accounts already existing
    if (firstName === '' || lastName === ''
          || sponsor === '' || type === '' || email === '' || address === ''
          || username === '' || password === ''){
      //tell the user to try again
      alert('NOT ALL FIELDS FILLED OUT');

      return;
    }

    if(password.indexOf('$') === -1 && password.indexOf('!') === -1 && password.indexOf('@') === -1 && password.indexOf('&') === -1 && password.indexOf('?') === -1){
      alert('Password must include a special character ($,!,@,&,?)');

      return;
    }

    if(password.length < 8){
      alert('Password must be at least 8 characters');

      return;
    }
      password = polynomialRollingHash(password);
    //Step 2 - Send the data along to the server
    //load up a json object with our data that we're sending
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      type: type,
      sponsorKey: sponsor,
      email: email,
      address: address,
      username: username,
      password: password,
    };

    //post it to the server
    axios.post('http://localhost:8081/newUser', newUser)
    .then(function (response) { //this part waits and plays out when a response is recieved, it's asynchronous
      console.log(response);
      if (response.status === 200){
        alert("Account created successfully");
      }else{
        alert("Account Creation was unsuccessful")
      }
    })
    .catch(function (error) {   //this part catches errors
      console.log(error);
    });


    //step 3 - listen for a response from the server (This is the .then function above)
    //Step 4 - react to the response given to the server (this is will be the body of the .then function above)
  }

  return(
    <div>
      <center>
      <h1> Create User </h1>
      <form onSubmit={onFormSubmit}>


         <br/>
        <label htmlFor="FirstName">First Name</label>
        <input id='FirstName' type='text'/>
        <label htmlFor="LastName">Last Name</label>
        <input id='LastName' type='text'/><br/>
        <label htmlFor="email">Email</label>
        <input id='email' type='email'/><br/>
        <label htmlFor="address">Address</label>
        <input id='address' type='text'/><br/>
        <label htmlFor="username">Username</label>
        <input id='username' type='text'/>
        <label htmlFor="password">Password</label>
        <input id='password' type='text'/> <br/>

        <h3 style={{"display":"none"}}>User Created Successfully</h3>

        <br/>
        <label htmlFor="Security Question 1">Security Question 1</label>
        <input id='Security Question 1' type='text'/><br/>
        <label htmlFor="Security Question 1 Answer">Security Question 1 Answer</label>
        <input id='Security Question 1 Answer' type='text'/><br/><br/>
        <label htmlFor="Security Question 2">Security Question 2</label>
        <input id='Security Question 2' type='text'/><br/>
        <label htmlFor="Security Question 2 Answer">Security Question 2 Answer</label>
        <input id='Security Question 2 Answer' type='text'/><br/><br/>

        {/* <button type='submit'>Submit</button> */}
      </form>
      <button onClick={onFormSubmit}>Submit</button>
      </center>
    </div>
  )
}
