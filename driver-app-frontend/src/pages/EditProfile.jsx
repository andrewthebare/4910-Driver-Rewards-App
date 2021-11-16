import React from "react";
import axios from 'axios';

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

    function polynomialRollingHash(str)
    {

    // P and M
    let p = 31;
    let m = (1e9 + 9);
    let power_of_p = 1;
    let hash_val = 0;

    // Loop to calculate the hash value
    // by iterating over the elements of String
    for(let i = 0; i < str.length; i++)
    {
        hash_val = (hash_val + (str[i].charCodeAt() -
                    'a'.charCodeAt() + 1) * power_of_p) % m;
        power_of_p = (power_of_p * p) % m;
    }
    return hash_val;
  }

    function submitUpdate(){
        console.log("got into submit button");
        if (document.getElementById("FirstName").value === "" ){document.getElementById("FirstName").value = userInfo.FirstName}
        if(document.getElementById("LastName").value === "" ){document.getElementById("LastName").value = userInfo.LastName}
        if(document.getElementById("email").value === "" ){document.getElementById("email").value = userInfo.email}
        if(document.getElementById("address").value === ""){document.getElementById("address").value = userInfo.address}
        if(document.getElementById("username").value === ""){document.getElementById("username").value = userInfo.username}
        if(document.getElementById("password").value === ""){document.getElementById("password").value = userInfo.hashedPassword}
        if(document.getElementById("deleteTab").checked){document.getElementById("deleteTab").value = 1}
        else{document.getElementById("deleteTab").value = 0}

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
        axios.post('http://localhost:8081/Profile/EditProfile', updatedUser)
        .then(function (response) { //this part waits and plays out when a response is recieved, it's asynchronous
          console.log(response);
          if (response.status === 200){
            window.confirm("Are you sure you want to save your changes, you will be logged out?")
            sessionStorage.removeItem("userInfo");
            window.location.replace("/Login");
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
      var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      var driver = false;
      var userType = 3; 
      userType = userInfo.userType;
      if(userType === 2 || userType === 1 || userType === 0){
        driver = true;
      }
   return(
    <div>





         <br/>
        {driver && <label htmlFor="FirstName">First Name</label>}
        {driver && <input id='FirstName' placeholder = {userInfo.FirstName} type='text'/>} 
        {driver && <label htmlFor="LastName">Last Name</label>}
        {driver && <input id='LastName' placeholder = {userInfo.LastName} type='text'/>}<br/>

        {driver && <label htmlFor="email">Email</label>}
        {driver && <input id='email' placeholder= {userInfo.email} type='email'/>}<br/>
        {driver && <label htmlFor="address">Address</label>}
        {driver && <input id='address' placeholder= {userInfo.address} type='text'/>}<br/>
        {driver && <label htmlFor="username">Username</label>}
        {driver &&<input id='username' placeholder= {userInfo.username} type='text'/>}
        {driver && <label htmlFor="password">Password</label>}
        {driver && <input id='password' placeholder= {userInfo.hashedPassword} type='text'/> }<br/>
        {driver && <label htmlFor="deleteTab">Delete Acount?</label>}
        {driver && <input id='deleteTab'  type='checkbox'/>}

        {driver && <h3 style={{"display":"none"}}>User Created Successfully</h3>}

        <br/>
        <br/>
        <br/>
        {driver && <label htmlFor="Security Question 1">Security Question 1</label>}
        {driver && <input id='Security Question 1' type='text'/>}<br/>
        {driver && <label htmlFor="Security Question 1 Answer">Security Question 1 Answer</label>}
        {driver && <input id='Security Question 1 Answer' type='text'/>}<br/><br/>
        {driver &&<label htmlFor="Security Question 2">Security Question 2</label>}
        {driver &&<input id='Security Question 2' type='text'/>}<br/>
        {driver && <label htmlFor="Security Question 2 Answer">Security Question 2 Answer</label>}
        {driver && <input id='Security Question 2 Answer' type='text'/>}<br/><br/>

        {driver &&<button onClick={submitUpdate}>Submit</button>}
        {driver &&<button onClick={cancelUpdate}>Cancel</button>}

    </div>
   )
}

export default EditProfile;
