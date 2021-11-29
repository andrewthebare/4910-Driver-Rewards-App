import axios from "axios";
import React from "react";

export default function ApplicationList(props){
  const app = props.application;
  let obj = JSON.parse(app.ApplicationAns)
    delete obj.DriverID
    delete obj.SponsorID

    let obj1 = JSON.stringify(obj)
                //.replace(/[,]/g, '/n')
                .replace(/[\\]/g, '')
                .replace(/['"']/g, ' ')
                .replace(/['{}']/g, '')
  
  
  const onApprove = ()=>{
    let sessionInfo= JSON.parse(sessionStorage.getItem("userInfo"))
    let SponsorID = sessionInfo.sponsorKey;
    const sponsUserID = {
        SponsorID: SponsorID,
        UserID: app.UserID
    }

    axios.post('http://localhost:8081/approveApplication', sponsUserID)
    .then(function (response) {
      console.log(response);
      if (response.status === 200){
        alert("Application Approved");
      }
    })

  }

  const onDeny = () => {
    let sessionInfo= JSON.parse(sessionStorage.getItem("userInfo"))
    let SponsorID = sessionInfo.sponsorKey;
    const sponsUserID = {
        SponsorID: SponsorID,
        UserID: app.UserID
    }

    axios.post('http://localhost:8081/denyApplication', sponsUserID)
    .then(function (response) {
      console.log(response);
      if (response.status === 200){
        alert("Application Denied");
      }
    })
  }

  return(
    <tr className="catalogRow basic">
      <td>{app.UserID}</td>
      <td>{obj1}</td>
      <td><button onClick={onApprove}> Approve</button></td>
      <td><button onClick={onDeny}> Deny</button></td>
    </tr>
  )
}