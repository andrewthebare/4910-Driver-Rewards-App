import {React, useState} from "react";
import axios from "axios";

export default function EditUser() {


  //this is called a hook. first value(users) is the variable and the second one(setUsers) is a function that you call to update that variable
  //  when you update a hook, the whole page redraws. So, with that in mind, I wrote this code in a way that updates this variable with the data from the server
  //  so when the query comes back, everything gets redrawn, but with the new values now populating the list
  const [users, setUsers] = useState({});
  const [userData, setUserData]=useState({
    userType:2,
    FirstName:'',
    LastName:'',
    username:'',
    hashedPassword:'',
    sponsorKey:0,
    email:'',
    address:''
  })

  //asks for all the users from DB, and then fills in users variable with response
  const fetchDB = () =>{
    const newUser = { 
      firstName: 'Fred',
      lastName: 'Flinstone'
    };

    //post it to the server
    axios.get('http://localhost:8081/fetchUsers', newUser)
    .then(function (response) { //this part waits and plays out when a response is recieved, it's asynchronous
      console.log('response Data',response.data);
      setUsers(response.data)
    })
    .catch(function (error) {   //this part catches errors
      console.log(error);
    });

  }


  //this draws all the items found in users into the dropdown. Initially, there is only the default value, but after the DB values are fetched
  //  it automatically populates with the new values that are placed into users
  const populateUserList = () =>{
    let options = [];
    options.push(<option value='empty'>Select A User</option>)

    for (let i in users){
      options.push(<option value={users[i].userID}>{`${users[i].username} | ${users[i].firstName} ${users[i].lastName}`}</option>)
    }
    
    return options;
  }

  const setUserEdit = () =>{
    let selection = document.getElementById('userSelect').value;
    console.log('selection',selection);

    //query the db for a specific user
    axios.post('http://localhost:8081/oneUser', {userID:selection})
    .then(function (response) { //this part waits and plays out when a response is recieved, it's asynchronous
      console.log('response Data',response);

      //pull it down and populate a new JSON 
      let data = response.data;
      console.log('data',data)
      setUserData(data);


    })
    .catch(function (error) {   //this part catches errors
      console.log(error);
    });


  }

  const submit = ()=>{
    console.log('SUBMIT')

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
    // let secureQ1 = document.getElementById("Security Question 1").value;
    // let secureA1 = document.getElementById("Security Answer 1").value;
    // let secureQ2 = document.getElementById("Security Question 2").value;
    // let secureA2 = document.getElementById("Security Answer 2").value;

    //empty inputs should get stopped here, let the server figure out more complex errors like accounts already existing
    if (firstName === '' || lastName === '' || fetchVal === ''
          || sponsor === '' || type === '' || email === '' || address === ''
          || username === '' || password === ''){
      //tell the user to try again
      alert('NOT ALL FIELDS FILLED OUT');

      return;
    }

    //Step 2 - Send the data along to the server
    //load up a json object with our data that we're sending
    console.log('userData',userData)
    const updatedUser = {
      UserID: userData.UserID,
      firstName: firstName,
      lastName: lastName,
      type: type,
      sponsorKey: sponsor,
      email: email,
      address: address,
      username: username,
      password: password,  
      // secureQ1: secureQ1,
      // secureA1: secureA1,
      // secureQ2: secureQ2,
      // secureA2: secureA2,    
    };

    console.log('userData', userData)

    //post it to the server
    axios.post('http://localhost:8081/updateUser', updatedUser)
    .then(function (response) { //this part waits and plays out when a response is recieved, it's asynchronous
      console.log(response);
      if (response.status === 200){
        alert("Account Updated successfully");
      }else{
        alert("Account Update was unsuccessful");
      }
    })
    .catch(function (error) {   //this part catches errors
      console.log(error);
    });

  }
  var userType = 3;
  var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  var admin = false;
  userType = userInfo.userType;
  console.log('usertype = ', userType);
  if(userType === 0){
    admin = true;
  }
  return(
    <div>
      {admin && <button onClick={fetchDB}>Fetch Users</button>}
      {admin && <select id="userSelect">
        {populateUserList()}
      </select>}
      {admin && <button onClick={()=>setUserEdit()}>Edit User</button>}

      {admin && <form>

        <label htmlFor="usertype">User Type</label>
        <select id='usertype' selection={userData.userType}>
          <option value="admin">Admin</option>
          <option value="sponsor">Sponsor</option>
          <option value="user">User</option>
        </select>
        <label htmlFor="sponsorKey">Sponsor to be associated with</label>   {/*Could defo be a dropdown of sponsors in the future*/}
        <input id='sponsorKey' type='number' defaultValue={userData.sponsorKey}/>

        <br/>
        <label htmlFor="FirstName">First Name</label>
        <input id='FirstName' type='text' defaultValue={userData.FirstName}/>
        <label htmlFor="LastName">Last Name</label>
        <input id='LastName' type='text' defaultValue={userData.LastName}/><br/>

        <label htmlFor="email">Email</label>
        <input id='email' type='email' defaultValue={userData.email}/><br/>
        <label htmlFor="address">Address</label>
        <input id='address' type='text' defaultValue={userData.address}/><br/>
        <label htmlFor="username">Username</label>
        <input id='username' type='text' defaultValue={userData.username}/>
        <label htmlFor="password">Password</label>
        <input id='password' type='text' defaultValue={userData.hashedPassword}/> <br/>

        <h3 style={{"display":"none"}}>User Created Successfully</h3>

        <br/>
        <br/>
        <br/>
        
    </form>}
    {admin && <button type='submit' onClick={()=> submit()}>Submit</button>}

    </div>
    
  )

}