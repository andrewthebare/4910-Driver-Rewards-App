import {React, useState, useEffect} from "react";
import axios from 'axios';
import LogEvent from "./components/LogEvent";

export default function AdminCostBiller(){
    const useMountEffect = (fun) => useEffect(fun, [])
    const [userIDs, setIDs] = useState([]);
    const [sponsors, setSponsors] = useState([{SponsorID: 0, SponsorName: 'username'}])
    const [sponsorData, setSponsorData] = useState({});

    const fetchSponsors = ()=>{
        axios.get('http://localhost:8081/fetchSponsors').then(function(response){
            console.log('response',response);
            setSponsors(response.data);
        })
    }
    const fillSponsors = ()=>{
        let spon = [];

        for (let i in sponsors){
            spon.push(<option value={sponsors[i].SponsorID}>{sponsors[i].SponsorName}</option>)
        }
        return spon;
    }

    const fillSponsorData = () =>{
        let sponsor = document.getElementById('sponsorSelect').value;
        console.log(document.getElementById('sponsorSelect'))
        console.log('sponsor', sponsor)

        //fetch All users associated with Sponsor
        axios.get('http://localhost:8081/fetchSponsorsUsers', {params:{sponsor:sponsor}})
        .then(function(response){
            console.log('res', response.data);
            setIDs(response.data);

            // let Events = [];

            // for(let i in userIDs){
            //     axios.get('http://localhost:8081/fetchLogData', {params:{logData:}})
            // }
        })
    }

    useMountEffect(fetchSponsors);
    return(
        <div>
            <h1>Bill Viewer</h1>
            <select id='sponsorSelect'>
                {fillSponsors()}
            </select>
            <button onClick={fillSponsorData}>Set Sponsor</button>

            <div>
                <h3>Purchases</h3>
\               <LogViewer userNames={userIDs} />
                <button>Send Bill</button>
            </div>
        </div>
    )
}

export function LogViewer(props){

    const [parseLogData, setLogDataDisplay] = useState(props.logData);
  
  
    const populateLog = () =>{
      let logList = [];
  
      for (let i in parseLogData){
        logList.push(<LogEvent data={parseLogData[i]}/>);
        // logList.push(<br/>)
      }
  
      return logList;
    }
  
    const fetchData = (logData) =>{

        console.log('logData', logData);

        let data = [];
    
        for(let i in props.userNames){
            console.log('i',props.userNames[i].username);
            logData['user'] = props.userNames[i].username;
            console.log('logData', logData)
            axios.get('http://localhost:8081/fetchLogData', {params:{logData:logData}})
            .then(function (response) { //this part waits and plays out when a response is recieved, it's asynchronous
              if(response.data.length > 0)              
                data = data.concat(response.data);
              //   setLogDataDisplay(response.data);
            })
            .catch(function (error) {   //this part catches errors
              console.log(error);
            });
        }
        setTimeout(()=> setLogDataDisplay(data),1000)
      }    

    // useMountEffect(fetchData)
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
      <LogDataInput fetchData={fetchData}/>
  
       {admin && <table className='logHolder'>
        <tr className='LogEvent header'>
          <th id='dateHeader'>Date</th>
          <th id='eventHeader' style={{cursor:'pointer'}}>Event</th>
          <th id='userHeader'  style={{cursor:'pointer'}}>User</th>
          <th>Data</th>
        </tr>
        {populateLog()}
       </table>}
     </div> 
    )
  }
  
  export function LogDataInput(props){
    let today = new Date();
    today.setDate(today.getDate()+1);
  
    return(
      <div>
        <div>
          <label for="dateRangeStart">Start</label>
          <input id='dateRangeStart' type='date'defaultValue={new Date(2021,8,3).toISOString().split('T')[0]}/>
          <label for="dateRangeEnd">End</label>
          <input id='dateRangeEnd' type='date' defaultValue={today.toISOString().split('T')[0]}/>
        </div>
        <div>
          <label for="userLabel">User</label>
          <input id='userLabel' type='text' defaultValue={''}/>
        </div>
        <button onClick={()=>{
  
          const logData = {
            start: document.getElementById('dateRangeStart').value,
            end: document.getElementById('dateRangeEnd').value,
            type: 40,
            user: document.getElementById('userLabel').value,
          }
  
  
          props.fetchData(logData)
        }}>See Purchases</button>
      </div>
    )
  }