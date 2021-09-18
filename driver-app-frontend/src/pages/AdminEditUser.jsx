import {React, useState} from "react";
import axios from "axios";

export default function EditUser() {

  //this is called a hook. first value(users) is the variable and the second one(setUsers) is a function that you call to update that variable
  //  when you update a hook, the whole page redraws. So, with that in mind, I wrote this code in a way that updates this variable with the data from the server
  //  so when the query comes back, everything gets redrawn, but with the new values now populating the list
  const [users, setUsers] = useState({});

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


  const populateUserList = () =>{
    let options = [];
    options.push(<option>Select A User</option>)

    for (let i in users){
      options.push(<option value={users[i].userID}>{`${users[i].username} | ${users[i].firstName} ${users[i].lastName}`}</option>)
    }
    
    return options;
  }


  return(
    <div>
      <button onClick={fetchDB}>Fetch Users</button>
      <select>
        {populateUserList()}
      </select>
      <button onClick={()=>{console.log('users',users)}}>check users</button>
    </div>
  )

}