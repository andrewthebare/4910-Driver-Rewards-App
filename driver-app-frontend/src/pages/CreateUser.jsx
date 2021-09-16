import React from "react";
import axios from 'axios';

export default function CreateUser(){

  //infrastructure function that just fetches the DB
  const fetchDB = () =>{
    const newUser = { 
      firstName: 'Fred',
      lastName: 'Flinstone'
    };

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
    console.log(firstName);
    console.log(lastName);

    //empty inputs should get stopped here, let the server figure out more complex errors like accounts already existing
    if (firstName === '' || lastName === ''){
      //tell the user to try again

      return;
    }

    //Step 2 - Send the data along to the server
    //load up a json object with our data that we're sending
    const newUser = { 
      firstName: firstName,
      lastName: lastName
    };

    //post it to the server
    axios.post('http://localhost:8081/newUser', newUser)
    .then(function (response) { //this part waits and plays out when a response is recieved, it's asynchronous
      console.log(response);
    })
    .catch(function (error) {   //this part catches errors
      console.log(error);
    });
    

    //step 3 - listen for a response from the server (This is the .then function above)
    //Step 4 - react to the response given to the server (this is will be the body of the .then function above)
  }

  return(
    <div>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="FirstName">First Name</label>
        <input id='FirstName' type='text'/>
        <label htmlFor="LastName">Last Name</label>
        <input id='LastName' type='text'/><br/>
        <label htmlFor="Security Question 1">Security Question 1</label>
        <input id='Security Question 1' type='text'/><br/>
        <label htmlFor="Security Question 1 Answer">Security Question 1 Answer</label>
        <input id='Security Question 1 Answer' type='text'/><br/><br/>
        <label htmlFor="Security Question 2">Security Question 2</label>
        <input id='Security Question 2' type='text'/><br/>
        <label htmlFor="Security Question 2 Answer">Security Question 2 Answer</label>
        <input id='Security Question 2 Answer' type='text'/><br/><br/>

        <button type='submit'>Submit</button>
      </form>
      <button onClick={addFred}>Add Fred Flinstone</button>
      <button onClick={onFormSubmit}>Dummy Submit</button>
      <button onClick={fetchDB}>Fetch DB</button>
    </div>
  )
}