import React from "react";
import axios from 'axios';

function BlockedUser(){
    var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    let userID = userInfo.UserID;
    alert("No Blocked Users")
    // axios.post('http://ec2-52-91-166-21.compute-1.amazonaws.com:3000/Settings', userID)
    //     .then(function (response) { //this part waits and plays out when a response is recieved, it's asynchronous
    //       console.log(response);
    //       if (response.status === 200){
    //         alert("Settings Successfully Updated");
    //         window.location= "http://localhost:3000/Profile";
    //         return false;
    //       }else{
    //         alert("No Blocked Users")
    //         window.location= "http://localhost:3000/Settings";
    //         return false;
    //       }
    //     })
       
};
function UnblockAll(){
    alert("There are no users to unblock")
};
function SubChanges(){
    var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    let UserID = userInfo.UserID;

    let font = document.getElementById("FontSize").value;
    if(document.getElementById("darkThemeTab").checked){
        document.getElementById("darkThemeTab").value = 1;
    }else if(!document.getElementById("darkThemeTab").checked){
        document.getElementById("darkThemeTab").value = 0;
    }
    let darkTheme = document.getElementById("darkThemeTab").value;
    if(document.getElementById("securityQs").checked){
        document.getElementById("securityQs").value = 1;
    }else if(!document.getElementById("securityQs").checked){
        document.getElementById("securityQs").value = 0;
    }
    let securityQ = document.getElementById("securityQs").value;
    if(document.getElementById("2StepAuth").checked){
        document.getElementById("2StepAuth").value = 1;
    }else if(!document.getElementById("2StepAuth").checked){
        document.getElementById("2StepAuth").value = 0;
    }
    let twostep = document.getElementById("2StepAuth").value;
    if(document.getElementById("emailNotif").checked){
        document.getElementById("emailNotif").value = 1;
    }else if(!document.getElementById("emailNotif").checked){
        document.getElementById("emailNotif").value = 0;
    } 
    let emailNote = document.getElementById("emailNotif").value;
    let preBill = document.getElementById("savePreBill").value;
    let preOrder = document.getElementById("savePreOrders").value;
    //let profilePicture = document.getElementById("profilePic").value;
    if(document.getElementById("removePic").checked){
        document.getElementById("removePic").value = 1;
    }else if(!document.getElementById("removePic").checked){
        document.getElementById("removePic").value = 0;
    } 
    let removePicture = document.getElementById("removePic").value;

    if(font === 'regular'){
        font = 1;
    }
    else if(font === 'large'){
        font = 2;
    }
    else if(font === 'extra Large'){
        font = 3;
    }
    // else{
    //     font = 1;
    // }
    if(darkTheme === '1'){
        darkTheme = 1;
    }
    else if(darkTheme === '0'){
        darkTheme = 0;
    }
    //else{
    //     darkTheme =1;
    // }
    if(twostep === '0'){
        twostep = 0;
    }
    else if(twostep === '1'){
        twostep =1;
    }
    if(securityQ === '0'){
        securityQ = 0;
    }
    else if(securityQ === '1'){
        securityQ =1;
    }
    if(emailNote === '0'){
        emailNote = 0;
    }
    else if(emailNote === '1'){
        emailNote =1;
    }

    if(removePicture === '0'){
        removePicture = 0;
    }
    else if(removePicture === '1'){
        removePicture =1;
    }
    if(preBill === '1'){preBill = 1}
    else if(preBill === '3'){preBill = 3}
    else if(preBill === '5'){preBill = 5}
    else if(preBill === '7'){preBill = 7}
    else if(preBill === '9'){preBill = 9}
    else if(preBill === '12'){preBill = 12}
    if(preOrder === '1'){preOrder = 1}
    else if(preOrder === '3'){preOrder = 3}
    else if(preOrder === '5'){preOrder = 5}
    else if(preOrder === '7'){preOrder = 7}
    else if(preOrder === '9'){preOrder = 9}
    else if(preOrder === '12'){preOrder = 12}
    const updatedSet = {
        UserID: UserID,
        font: font,
        darkTheme: darkTheme,
        securityQ: securityQ,
        twostep: twostep,
        emailNote: emailNote,
        preBill: preBill,
        preOrder: preOrder,
       // profilePicture: profilePicture,
        removePicture: removePicture,
    };
    console.log("updateSet: ", updatedSet);

    axios.post('http://ec2-52-91-166-21.compute-1.amazonaws.com:3000/Settings', updatedSet)
        .then(function (response) { //this part waits and plays out when a response is recieved, it's asynchronous
          console.log(response);
          if (response.status === 200){
            alert("Settings Successfully Updated");
            window.location= "http://localhost:3000/Profile";
            return false;
          }else{
            alert("Please Try Again")
            window.location= "http://localhost:3000/Settings";
            return false;
          }
        })
    
}

function SetDefault(){
    var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    let UserID = userInfo.UserID;

    let font = 1;
    let darkTheme = 0;
    let securityQ = 0;
    let twostep = 0; 
    let emailNote = 0;
    let preBill = 12;
    let preOrder = 12;
    //let profilePicture = null;
    //let removePicture = false;
    

    const updatedSet = {
        UserID: UserID,
        font: font,
        darkTheme: darkTheme,
        securityQ: securityQ,
        twostep: twostep,
        emailNote: emailNote,
        preBill: preBill,
        preOrder: preOrder,
       // profilePicture: profilePicture,
       //removePicture: removePicture,
    };
    console.log("updateSet: ", updatedSet);
    axios.post('http://ec2-52-91-166-21.compute-1.amazonaws.com:3000/Settings', updatedSet)
        .then(function (response) { //this part waits and plays out when a response is recieved, it's asynchronous
          console.log(response);
          if (response.status === 200){
            alert("Settings Successfully Restored To Default");
            window.location= "http://localhost:3000/Profile";
            return false;
          }else{
            alert("Please Try Again")
            window.location= "http://localhost:3000/Settings";
            return false;
          }
        })
    
}

function UndoChanges(){
    alert("Previous Settings Restored")
    window.location.replace("/Profile");
    return false;
}



function Settings(){
// var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  var driver = false;
  var userType = 3; 
  userType = userInfo.userType;
  if(userType === 2 || userType === 1 || userType === 0){
    driver = true;
  }
return(
    <div>
        {driver &&<label htmlFor="FontSize">Font Size</label>}   
           {driver && <select id='FontSize'>
             <option value="regular">Regular</option>
             <option value="large">Large</option>
             <option value="extraLarge">Extra Large</option>
             </select>}
            <br/>
        {driver &&<label htmlFor="darkThemeTab">Dark Theme?</label>}
            {driver &&<input id='darkThemeTab'  type='checkbox'/>}
            <br/>
        
        {driver &&<label htmlFor="securityQs">Require Security Questions?</label>}
            {driver &&<input id='securityQs'  type='checkbox'/>}
            <br/>
        {driver &&<label htmlFor="2StepAuth">Reuire 2-Step Authentification?</label>}
            {driver &&<input id='2StepAuth'  type='checkbox'/>}
            <br/>
        {driver &&<label htmlFor="emailNotif">Receive Email Notifications?</label>}
            {driver &&<input id='emailNotif'  type='checkbox'/>}
            <br/>
        {driver &&<label htmlFor="savePreBill">Save previous bills for</label>}   
            {driver &&<select id='savePreBill'>
                <option value="1">1</option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="7">7</option>
                <option value="9">9</option>
                <option value="12">12</option>
            </select>}months
            <br/>
        {driver &&<label htmlFor="savePreOrders">Save previous orders for</label> }  
            {driver &&<select id='savePreOrders'>
                <option value="1">1</option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="7">7</option>
                <option value="9">9</option>
                <option value="12">12</option>
            </select>}months
            <br/>
       
            {/* {driver &&<label htmlFor="profilePic">Upload a Profile Picture</label>}
            {driver &&<input id='profilePic'  type='file'/>}
            {driver &&<label htmlFor="removePic">Remove Profile Picture</label>}
            {driver && <input id='removePic' type='checkbox'/>} */}
            <br/>
        {driver &&<button onClick={SubChanges}>Submit Changes</button>}
        {driver &&<button onClick={SetDefault}>Set to Default</button>}
        {driver &&<button onClick={UndoChanges}>Undo Changes</button>}
        {/* {driver &&<button onClick={BlockedUser}>Blocked Users</button>}
        {driver &&<button onClick={UnblockAll}>Unblock All Users</button>} */}
    </div>
)

}

export default Settings;