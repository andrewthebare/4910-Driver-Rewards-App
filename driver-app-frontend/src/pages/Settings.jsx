import React from "react";
import axios from 'axios';

function BlockedUser(){
    var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    let userID = userInfo.UserID;
    alert("No Blocked Users")
    // axios.post('http://localhost:8081/Settings', userID)
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
    let font = document.getElementById("fontSize").value;
    let darkTheme = document.getElementById("darkThemeTab").value;
    let readRec = document.getElementById("readReceipt").value;
    let securityQ = document.getElementById("securityQs").value;
    let twostep = document.getElementById("2StepAuth").value; 
    let emailNote = document.getElementById("emailNotif").value;
    let preBill = document.getElementById("savePreBill").value;
    let preOrder = document.getElementById("savePreOrders").value;
    let colorMes = document.getElementById("messageColor").value;
    let profilePicture = document.getElementById("profilePic").value;
    let removePicture = document.getElementById("removePic").value;

    const updatedSet = {
        font: font,
        darkTheme: darkTheme,
        readRec: readRec,
        securityQ: securityQ,
        twostep: twostep,
        emailNote: emailNote,
        preBill: preBill,
        preOrder: preOrder,
        colorMes: colorMes,
        profilePicture: profilePicture,
        removePicture: removePicture,
    };

    // axios.post('http://localhost:3000/Settings', updatedSet)
    //     .then(function (response) { //this part waits and plays out when a response is recieved, it's asynchronous
    //       console.log(response);
    //       if (response.status === 200){
    //         alert("Settings Successfully Updated");
    //         window.location= "http://localhost:3000/Profile";
    //         return false;
    //       }else{
    //         alert("Please Try Again")
    //         window.location= "http://localhost:3000/Settings";
    //         return false;
    //       }
    //     })
    
}

function SetDefault(){
    let font = 'regular';
    let darkTheme = false;
    let readRec = false;
    let securityQ = false;
    let twostep = false; 
    let emailNote = false;
    let preBill = 12;
    let preOrder = 12;
    let colorMes = 'green';
    let profilePicture = null;
    let removePicture = false;
    

    const updatedSet = {
        font: font,
        darkTheme: darkTheme,
        readRec: readRec,
        securityQ: securityQ,
        twostep: twostep,
        emailNote: emailNote,
        preBill: preBill,
        preOrder: preOrder,
        colorMes: colorMes,
        profilePicture: profilePicture,
        removePicture: removePicture,
    };

    // axios.post('http://localhost:3000/Settings', updatedSet)
    //     .then(function (response) { //this part waits and plays out when a response is recieved, it's asynchronous
    //       console.log(response);
    //       if (response.status === 200){
    //         alert("Settings Successfully Restored To Default");
    //         window.location= "http://localhost:3000/Profile";
    //         return false;
    //       }else{
    //         alert("Please Try Again")
    //         window.location= "http://localhost:3000/Settings";
    //         return false;
    //       }
    //     })
    
}

function UndoChanges(){
    alert("Previous Settings Restored")
    window.location.replace("/Profile");
    return false;
}



function Settings(){
// var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

return(
    <div>
        <label htmlFor="FontSize">Font Size</label>   
            <select id='FontSize'>
             <option value="regular">Regular</option>
             <option value="large">Large</option>
             <option value="extraLarge">Extra Large</option>
             </select>
            <br/>
        <label htmlFor="darkThemeTab">Dark Theme?</label>
            <input id='darkThemeTab'  type='checkbox'/>
            <br/>
        <label htmlFor="readReceipt">Read Receipts?</label>
            <input id='readReceipt'  type='checkbox'/>
            <br/>
        <label htmlFor="securityQs">Require Security Questions?</label>
            <input id='securityQs'  type='checkbox'/>
            <br/>
        <label htmlFor="2StepAuth">Reuire 2-Step Authentification?</label>
            <input id='2StepAuth'  type='checkbox'/>
            <br/>
        <label htmlFor="emailNotif">Receive Email Notifications?</label>
            <input id='emailNotif'  type='checkbox'/>
            <br/>
        <label htmlFor="savePreBill">Save previous bills for</label>   
            <select id='savePreBill'>
                <option value="1">1</option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="7">7</option>
                <option value="9">9</option>
                <option value="12">12</option>
            </select>months
            <br/>
        <label htmlFor="savePreOrders">Save previous orders for</label>   
            <select id='savePreOrders'>
                <option value="1">1</option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="7">7</option>
                <option value="9">9</option>
                <option value="12">12</option>
            </select>months
            <br/>
        <label htmlFor="messageColor">Color of Messages</label>
            <br/>
            <select id='messageColor'>
                <option value="blue">Blue</option>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="purple">Purple</option>
                <option value="orange">Orange</option>
                <option value="yellow">Yellow</option>
            </select>
            <br/>
            <label htmlFor="profilePic">Upload a Profile Picture</label>
            <input id='profilePic'  type='file'/>
            <label htmlFor="removePic">Remove Profile Picture</label>
            <input id='removePic' type='checkbox'/>
            <br/>
            {/* <label htmlFor="Security Question 1">Security Question 1</label>
            <input id='Security Question 1' type='text'/><br/>
            <label htmlFor="Security Question 1 Answer">Security Question 1 Answer</label>
            <input id='Security Question 1 Answer' type='text'/><br/><br/>
            <label htmlFor="Security Question 2">Security Question 2</label>
            <input id='Security Question 2' type='text'/><br/>
            <label htmlFor="Security Question 2 Answer">Security Question 2 Answer</label>
            <input id='Security Question 2 Answer' type='text'/><br/><br/> */}
        <button onClick={SubChanges}>Submit Changes</button>
        <button onClick={SetDefault}>Set to Default</button>
        <button onClick={UndoChanges}>Undo Changes</button>
        <button onClick={BlockedUser}>Blocked Users</button>
        <button onClick={UnblockAll}>Unblock All Users</button>
    </div>
)

}

export default Settings;