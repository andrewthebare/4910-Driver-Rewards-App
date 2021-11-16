import React from "react";
import axios from 'axios';

export default function CreateUser(){

  //infrastructure function that just fetches the DB
  const fetchDB = () =>{
    const newUser = {
      firstName: 'Fred',
      lastName: 'Flinstone'
    };

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

    //post it to the server
    axios.get('http://localhost:8081', newUser)
    .then(function (response) { //this part waits and plays out when a response is recieved, it's asynchronous
      console.log(response);
    })
    .catch(function (error) {   //this part catches errors
      console.log(error);
    });

  }

  /**
   * This is a very simple example of how we're going to talk to the DB
   * This function is called when I click on the Add Fred Flinstone button
   */
  const addFred = () =>{

    //load up a json object with our data that we're sending
    const newUser = {
      firstName: 'Fred',
      lastName: 'Flinstone'
    };

    //post it to the server
    axios.post('http://localhost:8081/newUser', newUser)
    .then(function (response) { //this part waits and plays out when a response is recieved, it's asynchronous
      console.log(response);
    })
    .catch(function (error) {   //this part catches errors
      console.log(error);
    });

  }

  //Basic format for how we talk to the DB
  //This function is called when the submit button is clicked
  const onFormSubmit = ()=>{
    //Step 1 - Make sure that all the necissary fields are filled out
    let firstName = document.getElementById("FirstName").value;
    let lastName = document.getElementById("LastName").value;
    let fetchVal = document.getElementById("usertype").value;
    let type = fetchVal === 'admin'? 0 : fetchVal === 'sponsor'? 1 : 2 ;
    let sponsor = document.getElementById("sponsorKey").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    // let secureQ1 = document.getElementById("Security Question 1").value;
    // let secureA1 = document.getElementById("Security Answer 1").value;
    // let secureQ2 = document.getElementById("Security Question 2").value;
    // let secureA2 = document.getElementById("Security Answer 2").value;

    //empty inputs should get stopped here, let the server figure out more complex errors like accounts already existing
    if (firstName === '' || lastName === '' || fetchVal === ''
          || sponsor === '' || type === '' || email === '' || address === ''
          || username === '' || password === ''){
      //tell the user to try again
      console.warn('NOT ALL FIELDS FILLED OUT');

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
  var userType = 3;
  var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  var admin = false;
  userType = userInfo.userType;
  console.log('usertype = ', userType);
  if(userType === 0){
    admin = true;
  }
  return(
    <div>
      <center>
      <h1> Create User </h1>
      {admin && <form onSubmit={onFormSubmit}>

        <label htmlFor="usertype">User Type</label>
        <select id='usertype'>
          <option value="admin">Admin</option>
          <option value="sponsor">Sponsor</option>
          <option value="user">User</option>
        </select>
        <label htmlFor="sponsorKey">Sponsor to be associated with</label>   {/*Could defo be a dropdown of sponsors in the future*/}
        <input id='sponsorKey' type='number' style={{maxWidth:'60px'}}/>
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
      </form>}
      {admin && <button onClick={onFormSubmit}>Submit</button>}
      </center>
    </div>
  )
}
