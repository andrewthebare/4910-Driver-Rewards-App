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
    axios.post('http://localhost:8081/showSponsorGroup', mjson, { headers: {"Content-Type": "application/json"} })
    .then((response) => {
      setUsrs(response.data);
      console.log(usrs);
    })
    .catch(function (error) {
      console.error(error);
    });
  }

  const addPoints = ()=>{

    let addPts = document.getElementById("points").value;
    let userToAdd = document.getElementById("usrSelect").value;
    const mjson = {
      points: addPts,
      userID: userToAdd,
    }
    axios.patch('http://localhost:8081/addPoints',mjson)


  }

  const populateIDList= () =>{
    let options = [];
    options.push(<option value='empty'>Select A User</option>)

    for (let i in usrs){
      options.push(<option value={usrs[i].UserID}>{`${usrs[i].Username}`}</option>)
    }

    return options;
  }

  return(
    <div>
    <center>
    <button type='submit' onClick={showSponsorGroup}> View Drivers </button>

    <DriverList users = {usrs}/>
    </center>
    <br></br>
    <center>
    <label htmlFor="user">Driver to Add Points To</label>
    <select id="usrSelect">
      {populateIDList()}
    </select>
    <br></br>
    <label htmlFor="point">Points</label>
    <input id='points' type='number'/>
    <br></br>
    <button type='submit' onClick={addPoints}> Add Points </button>
    </center>
    </div>
  )




}
