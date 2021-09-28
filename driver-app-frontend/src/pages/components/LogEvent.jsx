import React from "react";
import './LogEvent.css'

export default function LogEvent(props) {

  const data = props.data;


  return(
    <div className='LogEvent'>
      
      <p>{`${data.Date} | ${data.EventType} | ${data.username} |`}</p>
    </div>
  )
}