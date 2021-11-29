import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

import axios from 'axios';



class DriverList extends React.Component{
  render(){
    var user_list = this.props.users.map(function(user) {
      return (
        <DriverListItem UserID={user.UserID}
                       FirstName={user.FirstName}
                       LastName={user.LastName}
                       Username={user.Username}
                       Points={user.Points}/>
      );
    }.bind(this));
    
    return (
      <table>
        <thead>
          <tr>
            <th> ID </th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {user_list}
        </tbody>
      </table>
    );
  }
}

class DriverListItem extends React.Component{
  render(){
    return (
      <tr>
        <td> {this.props.UserID}</td>
        <td>{this.props.FirstName}</td>
        <td>{this.props.LastName}</td>
        <td>{this.props.Username}</td>
        <td>{this.props.Points}</td>
      </tr>
    );
  }
}







export default function SponsorViewDrivers(){

  const [usrs, setUsrs] = useState([]);

  const showSponsorGroup = ()=>{

    var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    var sponsorGroup = userInfo.sponsorKey;
    const mjson = {
      username: userInfo.username,
      sponsorKey: sponsorGroup,
    };
    axios.post('http://ec2-52-91-166-21.compute-1.amazonaws.com:3000/showSponsorGroup', mjson, { headers: {"Content-Type": "application/json"} })
    .then((response) => {
      setUsrs(response.data);
      console.log(usrs);
    })
    .catch(function (error) {
      console.error(error);
    });
  }

  const addPoints = ()=>{
    var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    var sponsorGroup = userInfo.sponsorKey;
    let addPts = document.getElementById("points").value;
    let userToAdd = document.getElementById("usrSelect").value;
    let reason = document.getElementById("reasons").value;
    var actor = userInfo.UserID;
    const mjson = {
      points: addPts,
      userID: userToAdd,
      sponsor: sponsorGroup,
      reason: reason,
      actor: actor,
    }
    axios.patch('http://ec2-52-91-166-21.compute-1.amazonaws.com:3000/addPoints',mjson)

    var msg = addPts + " points have been added to your account";
    const msgJson = {
      username: userToAdd,
      message: msg,
      userID: actor,
    };
    axios.post('http://ec2-52-91-166-21.compute-1.amazonaws.com:3000/sendAlertMessage', msgJson)
  }

  const removePoints = ()=>{
    var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    var sponsorGroup = userInfo.sponsorKey;
    var actor = userInfo.UserID;
    let remPts = document.getElementById("points").value;
    let userToRem = document.getElementById("usrSelect").value;
    let reason = document.getElementById("reasons").value;
    const mjson = {
      points: remPts,
      userID: userToRem,
      sponsor: sponsorGroup,
      reason: reason,
      actor: actor,
    }
    axios.patch('http://ec2-52-91-166-21.compute-1.amazonaws.com:3000/removePoints',mjson)
    var msg = remPts + " points have been removed from your account";
    const msgJson = {
      username: userToRem,
      message: msg,
      userID: actor,
    };
    axios.post('http://ec2-52-91-166-21.compute-1.amazonaws.com:3000/sendAlertMessage', msgJson)


  }


  const removeDriver = ()=>{
    var driver = document.getElementById("driverSelect").value;
    var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    var sponsorGroup = userInfo.sponsorKey;
    const mjson ={
      username: driver,
      sponsorKey: sponsorGroup,
    };

    axios.post('http://ec2-52-91-166-21.compute-1.amazonaws.com:3000/removeDriver', mjson)
  }


  const populateIDList= () =>{
    let options = [];
    options.push(<option value='empty'>Select A User</option>)

    for (let i in usrs){
      options.push(<option value={usrs[i].UserID}>{`${usrs[i].Username}`}</option>)
    }

    return options;
  }


  var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  var sponsor = false;
  var userType = 3; 
  userType = userInfo.userType;
  if(userType === 1 || userType === 0){
    sponsor = true;
  }
  return(
    <div>
    <center>
    {sponsor &&<button type='submit' onClick={showSponsorGroup}> View Drivers </button>}

    {sponsor &&<DriverList users = {usrs}/>}
    </center>
    <br></br>
    <center>
    {sponsor &&<label htmlFor="user">Driver to Change Points</label>}
    {sponsor &&<select id="usrSelect">
      {populateIDList()}
    </select>}
    <br></br>
    {sponsor &&<label htmlFor="point">Points</label>}
    {sponsor &&<input id='points' type='number'/>}
    <br></br>
    {sponsor &&<label htmlFor="reason"> Reason</label>}
    {sponsor &&<input id='reasons' type='text'/>}
    <br/>
    {sponsor &&<button type='submit' onClick={addPoints}> Add Points </button>}
    {sponsor &&<button type='submit' onClick={removePoints}> Remove Points </button>}
    <br></br>
    <br></br>
    {sponsor &&<label htmlFor="driver">Driver to Modify</label>}
    {sponsor &&<select id="driverSelect">
      {populateIDList()}
    </select>}
    {sponsor &&<button type='submit' onClick={removeDriver}> Remove Driver </button>}
    </center>
    </div>
  )




}
