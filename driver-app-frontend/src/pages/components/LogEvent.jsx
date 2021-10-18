import React from "react";
import './LogEvent.css'

export default function LogEvent(props) {

  const data = props.data;


  return(
    <tr className='LogEvent'>
      <td>{data.Date}</td>
      <td>{data.EventType}</td>
      <td className= "customFont">{data.username}</td>
      <td>{/*JSON.stringify(data.Content)*/ 'data'}</td>
      
      {/* <p>{`${data.Date} | ${data.EventType} | ${data.username} |`}</p> */}
    </tr>
  )
}