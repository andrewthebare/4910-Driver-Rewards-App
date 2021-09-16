import React from "react";
import axios from 'axios';
import { Link, withRouter } from "react-router-dom";

export default function Login(){
  const onFormSubmit = ()=>{

  }
  return(    
    <div>
      <h3>Login</h3>
      <form onSubmit={()=>onFormSubmit}>
        <label htmlFor="Username">Username</label>
	<input id='Username' type='text'/>
	<label htmlFor="Password"> Password </label>
	<input id='Password' type='text'/>
	<button type='submit'>Submit
  <Link class="login2profile-link" to="./Profile">
          <span class="sr-only">(current)</span>
        </Link>
  </button>
      </form>  
      <button >Submit
  <Link class="login2profile-link" to="./Profile">
          <span class="sr-only">(current)</span>
        </Link>
  </button>      
   </div>     
  )
}