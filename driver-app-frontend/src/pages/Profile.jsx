import React from "react";
import axios from 'axios';
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
    <div className="profile">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src="http://placehold.it/200x200"
              alt=""
            />
          </div>
          <p>
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
          First Name: <span id="fname"></span>
          </p>
          <script>
            document.getElementById('fname').innerHTML = userInfo.FirstName; 
          </script>
    
         
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;