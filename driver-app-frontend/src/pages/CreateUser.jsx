import React from "react";

export default function CreateUser(){

  return(
    <div>
      <form>
        <label htmlFor="FirstName">First Name</label>
        <input id='FirstName' type='text'/>
        <label htmlFor="LastName">Last Name</label>
        <input id='LastName' type='text'/>

        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}