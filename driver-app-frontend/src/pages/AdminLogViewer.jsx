import {React, useState, useEffect} from "react";
import LogEvent from "./components/LogEvent";
import axios from 'axios';


export default function AdminLogViewer(){

  let [sort,setSort] = useState({
    dateA:false,
    dateD:false,
    eventA:false,
    eventD:false,
    userA:false,
    userD:false,
  })

  const [logData, setLogData] = useState([]);
  const [parseLogData, setLogDataDisplay] = useState([]);
  const useMountEffect = (fun) => useEffect(fun, [])

  const setSortVariables = (keep)=>{
    let newSort = {
      dateA:false,
      dateD:false,
      eventA:false,
      eventD:false,
      userA:false,
      userD:false,
    };

    newSort[keep] = true;
    setSort(newSort);
  }

  function handleSort(event){
    let id = event.target.id;

    if (id ==='dateHeader'){
      if(sort.dateA){
        setSortVariables('dateD')
      }else{
        setSortVariables('dateA');
      }
    }

    if (id ==='eventHeader'){
      if(sort.eventA){
        setSortVariables('eventD')
      }else{
        setSortVariables('eventA');
      }
    }

    if (id ==='userHeader'){
      if(sort.userA){
        setSortVariables('userD')
      }else{
        setSortVariables('userA');
      }
    }

    setLogDataDisplay(parseData(parseLogData))
  }

  const parseData = (data)=>{
    let parsed = data;
    console.log('sort',sort);
    
    //splice out everything that isn't required
    
    
    //sort
    
    //username
    if(sort.userA){ //Ascending
      parsed = data.sort((a,b)=>{
        let userA = a.username.toLowerCase();
        let userB = b.username.toLowerCase();

        if(userA < userB)
        return -1;
        if(userA > userB)
        return 1;
        
        return 0;
      })
    }
    if(sort.userD){ //Descending
      parsed = data.sort((a,b)=>{
        let userA = a.username.toLowerCase();
        let userB = b.username.toLowerCase();

        if(userA < userB)
        return 1;
        if(userA > userB)
        return -1;
        
        return 0;
      })
    }

    //Event
    if(sort.eventD){ //Descending
      parsed = data.sort((a,b)=>{
        return a.EventType - b.EventType;
      })
    }
    if(sort.eventA){ //Ascending
      parsed = data.sort((a,b)=>{
        return -1* (a.EventType - b.EventType);
      })
    }
    
    return parsed;
  }
  
  const fetchData = () =>{
    axios.get('http://localhost:8081/fetchLogData', {})
    .then(function (response) { //this part waits and plays out when a response is recieved, it's asynchronous
      console.log('response', response);
      setLogData(response.data);
      setLogDataDisplay(parseData(response.data));
      parseData();
    })
    .catch(function (error) {   //this part catches errors
      console.log(error);
    });
  }

  const populateLog = () =>{
    let logList = [];

    for (let i in parseLogData){
      logList.push(<LogEvent data={parseLogData[i]}/>);
      // logList.push(<br/>)
    }

    return logList;
  }

  useMountEffect(fetchData)
  var userType = 3;
  var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  var admin = false;
  userType = userInfo.userType;
  console.log('usertype = ', userType);
  if(userType === 0){
    admin = true;
  }
  return(
   <div>
    {admin && <h1>Log Viewer</h1>}
     {admin && <table className='logHolder'>
      <tr className='LogEvent header'>
        <th id='dateHeader' onClick={handleSort}>Date</th>
        <th id='eventHeader' onClick={handleSort} style={{cursor:'pointer'}}>Event</th>
        <th id='userHeader' onClick={handleSort} style={{cursor:'pointer'}}>User</th>
        <th>Data</th>
      </tr>
      {populateLog()}
     </table>}
   </div> 
  )
}