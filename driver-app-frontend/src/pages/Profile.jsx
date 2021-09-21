import React from "react";
import axios from 'axios';
import './Profile.css';
// function get(){
//   var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
//   console.log("userInfo: ", userInfo);
//   Profile(userInfo);
// }
 function updateUser(){
   window.location.replace("/Profile/EditProfile");
   return false;
}
function submitUpdate(){

}
function cancelUpdate(){
  window.location.replace("/Profile");
}
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

<<<<<<< HEAD
      <table class="profile">
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
=======
          </p>
          <div class="col-lg-5">
            
            <p>{(()=>{
            if(userInfo.userType === 0){
              return(
                <div>User Type: Admin</div>
              )
            } else if(userInfo.userType === 1){
              return(
                <div>User Type: Sponsor</div>
              )
            } else if(userInfo.userType === 2){
              return(
                <div>User Type: Driver</div>
              )
            }else{
              return(
                <div>Didnt hit any</div>
              )
            }
          })()}
          UserID: {userInfo.UserID} <br></br>
          First Name: {userInfo.FirstName}<br></br>
          Last Name: {userInfo.LastName}<br></br>
          Points: {userInfo.Points}<br></br>
          Address: {userInfo.address}<br></br>
          Email: {userInfo.email}<br></br>
          Username: {userInfo.username}<br></br>
          Password: {userInfo.hashedPassword}<br></br>
          Sponsor ID: {userInfo.sponsorKey}<br></br>


          </p>
          <button onClick={updateUser}>Edit</button>
    
         
          
          </div>
        </div>
>>>>>>> f2ed8e9a73515b936c01aacd83c31771a8e1164d
      </div>
  );
}

export default Profile;
