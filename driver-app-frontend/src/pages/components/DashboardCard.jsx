import React from "react";
import { Link, withRouter } from "react-router-dom";

export default function DashboardCard(props) {
  
  return(
    <div className='neomorph dashCard'>

      <img className='' src={props.src} style={{maxWidth:'100%', height:'auto', border:'1pt solid #aaa', borderRadius:'8px'}}/>
      <div className='content'>
        <p>{props.description}</p>
      </div>

      <div className='btnHolder'>
        <button className= "dashbtn neoInverse">
          <Link class="adminButton" to={props.to}>
            {props.text}
          </Link>
        </button>
      </div>
  </div>

  )
}