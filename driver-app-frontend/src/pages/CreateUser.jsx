import React from "react";
import axios from 'axios';

export default function CreateUser(){

  /**
   * This is a very simple example of how we're going to talk to the DB
   * This function is called when I click on the Add Fred Flinstone button
   */
  const addFred = () =>{
    //make sure that the stuff is ok
    console.log('Hi');

    const newUser = { 
      firstName: 'Fred',
      lastName: 'Flinstone'
    };

    //post it to the server
    axios.post('http://localhost:8081/newUser', newUser)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    console.log('Hello');

  }

  //Basic format for how we talk to the DB
  //This function is called when the submit button is clicked
  const onFormSubmit = ()=>{
    //Step 1 - Make sure that all the necissary fields are filled out
    
    //Step 2 - Send the data along to the server

    //step 3 - listen for a response from the server

    //Step 4 - react to the response given to the server
  }

  return(
    <div>
      <form onSubmit={()=>onFormSubmit}>
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
    </div>
  )
}