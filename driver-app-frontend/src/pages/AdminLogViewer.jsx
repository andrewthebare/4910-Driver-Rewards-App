import {React, useState, useEffect} from "react";
import LogEvent from "./components/LogEvent";
import axios from 'axios';

export default function AdminLogViewer(){
  const [logData, setLogData] = useState([]);
  const useMountEffect = (fun) => useEffect(fun, [])

  const fetchData = () =>{
    axios.get('http://localhost:8081/fetchLogData', {})
    .then(function (response) { //this part waits and plays out when a response is recieved, it's asynchronous
      console.log('response', response);
      setLogData(response.data)
    })
    .catch(function (error) {   //this part catches errors
      console.log(error);
    });
  }

  const populateLog = () =>{
    let logList = [];

    for (let i in logData){
      logList.push(<LogEvent data={logData[i]}/>);
      // logList.push(<br/>)
    }

    return logList;
  }

  useMountEffect(fetchData)

  return(
   <div>
     <div className='logHolder'>
      {populateLog()}
     </div>
   </div> 
  )
}