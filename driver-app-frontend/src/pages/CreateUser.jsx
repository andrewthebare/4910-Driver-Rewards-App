import React from "react";
import axios from 'axios';

export default function CreateUser(){

  const onFormSubmit = () =>{
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

  return(
    <div>
      <form onSubmit={()=>onFormSubmit}>
        <label htmlFor="FirstName">First Name</label>
        <input id='FirstName' type='text'/>
        <label htmlFor="LastName">Last Name</label>
        <input id='LastName' type='text'/>

        <button type='submit'>Submit</button>
      </form>
      <button onClick={onFormSubmit}>Add Fred Flinstone</button>
    </div>
  )
}