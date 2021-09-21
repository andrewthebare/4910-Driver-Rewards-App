import React from "react";
import axios from 'axios';
function submitUpdate(){
    //Step 1 - Make sure that all the necissary fields are filled out
    let firstName = document.getElementById("FirstName").value;
    let lastName = document.getElementById("LastName").value;
    let fetchVal = document.getElementById("usertype").value;
    let type = fetchVal === 'admin'? 0 : fetchVal === 'sponsor'? 1 : 2 ;
    let sponsor = document.getElementById("sponsorKey").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let secureQ1 = document.getElementById("Security Question 1").value;
    let secureA1 = document.getElementById("Security Answer 1").value;
    let secureQ2 = document.getElementById("Security Question 2").value;
    let secureA2 = document.getElementById("Security Answer 2").value;

    //empty inputs should get stopped here, let the server figure out more complex errors like accounts already existing
    if (firstName === '' || lastName === '' || fetchVal === ''
          || sponsor === '' || type === '' || email === '' || address === ''
          || username === '' || password === ''){
      //tell the user to try again
      console.warn('NOT ALL FIELDS FILLED OUT');

      return;
    }

    //Step 2 - Send the data along to the server
    //load up a json object with our data that we're sending
    const newUser = { 
      firstName: firstName,
      lastName: lastName,
      type: type,
      sponsorKey: sponsor,
      email: email,
      address: address,
      username: username,
      password: password,  
      secureQ1: secureQ1,
      secureA1: secureA1,
      secureQ2: secureQ2,
      secureA2: secureA2,    
    };

    //post it to the server
    axios.post('http://localhost:8081/newUser', newUser)
    .then(function (response) { //this part waits and plays out when a response is recieved, it's asynchronous
      console.log(response);
      if (response.status === 200){
        alert("Account created successfully");
      }else{
        alert("Account Creation was unsuccessful")
      }
    })
    .catch(function (error) {   //this part catches errors
      console.log(error);
    });
    

    //step 3 - listen for a response from the server (This is the .then function above)
    //Step 4 - react to the response given to the server (this is will be the body of the .then function above)
  }


 function EditProfile(){
    var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    console.log("userInfo inside profile: ",userInfo);
    console.log("First Name: ", userInfo.FirstName);
    console.log("Last Name: ",userInfo.LastName);

    function cancelUpdate(){
        console.log("inside cancelUpdate");
        alert("Successful Canceled");
        window.location= "http://localhost:3000/Profile";
        return false;
    }

    function submitUpdate(){
        console.log("got into submit button");
        if (document.getElementById("FirstName").value === "" ){document.getElementById("FirstName").value = userInfo.FirstName}
        if(document.getElementById("LastName").value === "" ){document.getElementById("LastName").value = userInfo.LastName}
        if(document.getElementById("email").value === "" ){document.getElementById("email").value = userInfo.email}
        if(document.getElementById("address").value === ""){document.getElementById("address").value = userInfo.address}
        if(document.getElementById("username").value === ""){document.getElementById("username").value = userInfo.username}
        if(document.getElementById("password").value === ""){document.getElementById("password").value = userInfo.hashedPassword}
        if(document.getElementById("deleteTab").value ==="on"){document.getElementById("deleteTab").value = 1}
        else if(document.getElementById("deleteTab").value ==="off"){document.getElementById("deleteTab").value = 0}
        
        //Step 1 - Make sure that all the necissary fields are filled out
        let firstName = document.getElementById("FirstName").value;
        let lastName = document.getElementById("LastName").value;
        let UserID = userInfo.UserID;
        let email = document.getElementById("email").value;
        let address = document.getElementById("address").value;
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let deleted = document.getElementById("deleteTab").value;
        
    
        //Step 2 - Send the data along to the server
        //load up a json object with our data that we're sending
        const updatedUser = { 
        UserID: UserID,
          firstName: firstName,
          lastName: lastName,
          email: email,
          address: address,
          username: username,
          password: password, 
          delete: deleted, 
             
        };
        console.log("pass updateUser: ", updatedUser);
        //post it to the server
        axios.post('http://localhost:3000/Profile/EditProfile', updatedUser)
        .then(function (response) { //this part waits and plays out when a response is recieved, it's asynchronous
          console.log(response);
          if (response.status === 200){
            alert("Profile Successfully Updated");
            window.location= "http://localhost:3000/Profile";
            return false;
          }else{
            alert("Please Try Again")
            window.location= "http://localhost:3000/Profile/EditProfile";
            return false;
          }
        })
        
    
        //step 3 - listen for a response from the server (This is the .then function above)
        //Step 4 - react to the response given to the server (this is will be the body of the .then function above)
      }

   return(
    <div>
      

        
        
        
         <br/>
        <label htmlFor="FirstName">First Name</label>
        <input id='FirstName' placeholder = {userInfo.FirstName} type='text'/>
        <label htmlFor="LastName">Last Name</label>
        <input id='LastName' placeholder = {userInfo.LastName} type='text'/><br/>

        <label htmlFor="email">Email</label>
        <input id='email' placeholder= {userInfo.email} type='email'/><br/>
        <label htmlFor="address">Address</label>
        <input id='address' placeholder= {userInfo.address} type='text'/><br/>
        <label htmlFor="username">Username</label>
        <input id='username' placeholder= {userInfo.username} type='text'/>
        <label htmlFor="password">Password</label>
        <input id='password' placeholder= {userInfo.hashedPassword} type='text'/> <br/>
        <label htmlFor="deleteTab">Delete Acount?</label>
        <input id='deleteTab'  type='checkbox'/>
        
        <h3 style={{"display":"none"}}>User Created Successfully</h3>

        <br/>
        <br/>
        <br/>
        <label htmlFor="Security Question 1">Security Question 1</label>
        <input id='Security Question 1' type='text'/><br/>
        <label htmlFor="Security Question 1 Answer">Security Question 1 Answer</label>
        <input id='Security Question 1 Answer' type='text'/><br/><br/>
        <label htmlFor="Security Question 2">Security Question 2</label>
        <input id='Security Question 2' type='text'/><br/>
        <label htmlFor="Security Question 2 Answer">Security Question 2 Answer</label>
        <input id='Security Question 2 Answer' type='text'/><br/><br/>

        <button onClick={submitUpdate}>Submit</button>
        <button onClick={cancelUpdate}>Cancel</button>
      
    </div>
   )
}

export default EditProfile;