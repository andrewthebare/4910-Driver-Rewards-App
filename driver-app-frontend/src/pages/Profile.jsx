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
function settings(){
  window.location.replace("/Settings");
  return false;
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
  if(userInfo.displayMode === 1){
    var element = document.body;
    element.classList.toggle("dark-mode");
  }
  console.log("userInfo inside profile: ",userInfo);
  console.log("First Name: ", userInfo.FirstName);
  console.log("Last Name: ",userInfo.LastName);

  var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  var driver = false;
  var userType = 3; 
  userType = userInfo.userType;
  if(userType === 2 || userType === 1 || userType === 0){
    driver = true;
  }
  return (
    <div className="profile">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src="https://s11284.pcdn.co/wp-content/uploads/2020/01/Commercial-truck-driver-leaving-cab.jpg.webp"
              alt=""
            />
          </div>
          {/* {driver && <p>
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

          </p>} */}
          
          <div class="col-lg-5">
          <h3>{userInfo.Points} <h4>Points</h4></h3>
            {driver &&<p>{(()=>{
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
          Address: {userInfo.address}<br></br>
          Email: {userInfo.email}<br></br>
          Username: {userInfo.username}<br></br>
          Password: {userInfo.hashedPassword}<br></br>
          Sponsor ID: {userInfo.sponsorKey}<br></br>


          </p>}
          {driver &&<button onClick={updateUser}>Edit</button>}
          {driver && <button onClick={settings}>Settings</button>}
    
         
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;