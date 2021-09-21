import {React, useState} from "react";
import axios from "axios";

export default function EditUser() {

  //this is called a hook. first value(users) is the variable and the second one(setUsers) is a function that you call to update that variable
  //  when you update a hook, the whole page redraws. So, with that in mind, I wrote this code in a way that updates this variable with the data from the server
  //  so when the query comes back, everything gets redrawn, but with the new values now populating the list
  const [users, setUsers] = useState({});

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
      setUsers(response.data)
    })
    .catch(function (error) {   //this part catches errors
      console.log(error);
    });


  }


  return(
    <div>
      <button onClick={fetchDB}>Fetch Users</button>
      <select id="userSelect">
        {populateUserList()}
      </select>
      <button onClick={()=>{console.log('users',users)}}>check users</button>
      <button onClick={()=>setUserEdit()}>Edit User</button>

      <form>

        <label htmlFor="usertype">User Type</label>
        <select id='usertype'>
          <option value="admin">Admin</option>
          <option value="sponsor">Sponsor</option>
          <option value="user">User</option>
        </select>
        <label htmlFor="sponsorKey">Sponsor to be associated with</label>   {/*Could defo be a dropdown of sponsors in the future*/}
        <input id='sponsorKey' type='number'/>

        <br/>
        <label htmlFor="FirstName">First Name</label>
        <input id='FirstName' type='text'/>
        <label htmlFor="LastName">Last Name</label>
        <input id='LastName' type='text'/><br/>

        <label htmlFor="email">Email</label>
        <input id='email' type='email'/><br/>
        <label htmlFor="address">Address</label>
        <input id='address' type='text'/><br/>
        <label htmlFor="username">Username</label>
        <input id='username' type='text'/>
        <label htmlFor="password">Password</label>
        <input id='password' type='text'/> <br/>

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

        <button type='submit'>Submit</button>
    </form>

    </div>
  )

}