import React from "react";
import { Link, withRouter } from "react-router-dom";

export default function DashboardCard(props) {
  
  return(
    <div className='dashCard neomorph'>

      <img src={props.src} style={{maxWidth:'100%', height:'auto', borderRadius:'8px'}}/>
      <div className='content'>
        Hello from Cards this is very long to be annoying
      </div>

      <div className='btnHolder'>
        <button className= "btn2">
          <Link class="adminButton" to={props.to}>
            Create User
            <span class="sr-only">(current)</span>
          </Link>
        </button>
      </div>
  </div>

  )
}