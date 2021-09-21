import React from "react";
import axios from 'axios';
import './Profile.css';
// function get(){
//   var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
//   console.log("userInfo: ", userInfo);
//   Profile(userInfo);
// }
// function renderUserType(userInfo){

//   if(userInfo.userType === 0) {
//     console.log("UserType: Admin");
//     return <div>Admin</div>;
//     }
//     if(userInfo.userType === 1){
//       return <div>Sponsor</div>;
//     }
//     if(userInfo.userType === 1){
//       return <div>Driver</div>;
//     }

// }
//window.onload = get();
function Profile() {
  var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  console.log("userInfo inside profile: ",userInfo);
  console.log("First Name: ", userInfo.FirstName);
  console.log("Last Name: ",userInfo.LastName);
  return (
    <div>
      <center>
        <img
          class="img-fluid rounded mb-4 mb-lg-0"
          src="http://placehold.it/200x200"
          alt=""
        />
      <br/>
      <h2> {userInfo.FirstName} {userInfo.LastName}</h2><br/>

      <table>
        <tr>
          <th>
            User Type
          </th>
          <td>
          {(()=>{
                if(userInfo.userType === 0){
                  return(
                    <div>Admin</div>
                  )
                } else if(userInfo.userType === 1){
                  return(
                    <div>Sponsor</div>
                  )
                } else if(userInfo.userType === 2){
                  return(
                    <div>Driver</div>
                  )
                }else{
                  return(
                    <div>Didnt hit any</div>
                  )
                }
              })()}
          </td>
        </tr>
        <tr>
          <th> User Id </th>
          <td> {userInfo.UserID} </td>
        </tr>
        <tr>
          <th> Points </th>
          <td> {userInfo.Points} </td>
        </tr>
        <tr>
          <th> Address </th>
          <td> {userInfo.address} </td>
        </tr>
        <tr>
          <th> Email </th>
          <td> {userInfo.email} </td>
        </tr>
        <tr>
          <th> Username </th>
          <td> {userInfo.username} </td>
        </tr>
        <tr>
          <th> Sponsor ID </th>
          <td> {userInfo.sponsorKey} </td>
        </tr>
      </table>
          <script>
            document.getElementById('fname').innerHTML = userInfo.FirstName;
          </script>
      </center>
      </div>
  );
}

export default Profile;
