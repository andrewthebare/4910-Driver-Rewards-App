import {React, useState, useEffect} from "react";
import axios from "axios";
import ApplicationList from "./components/ApplicationLists";

export default function ApplicationChoice(){
  const [allApplications, setAllApplications] = useState([])
  
  const fillApplicationRows = () =>{
    let rows = [];
    console.log(allApplications);

    
    for (let i in allApplications)
    {
      rows.push(
      <ApplicationList application={allApplications[i]}/>)
    }
    return rows;
  }

  const onCancel = () =>{
    window.location.replace("/SponsorDashboard")
  }

  const onFormFetch = () =>{
    let sessionInfo= JSON.parse(sessionStorage.getItem("userInfo"))
    let SponsorID = sessionInfo.sponsorKey;
    let sponsIDjson = {SponsorID: SponsorID}
    
    var tbl = document.getElementById('table');
    if (tbl.rows.length <= 1) {
        axios.get('http://localhost:8081/fetchApplication', {params: sponsIDjson})
        .then(function(response){
            console.log('fetch', response);
            let data = response.data;
            console.log('Returned Data', data);

            setAllApplications(data);
        
        })
        
    }

  }

  return(    
      <div>
        <h3>Driver Applications</h3>
        <button onClick={onFormFetch}>Load Applications</button><br/>
        <table align="center" styles="margin: 0px auto;" id="table">
        <tr>
            <th>UserID</th>
            <th>Question Answers</th>
            <th>Approve</th>
            <th>Deny</th>
        </tr>
        {fillApplicationRows()}
    </table>
      <span id="error"></span><br/>
      <button onClick={onCancel}> Return</button>
    </div>  
    )

  }