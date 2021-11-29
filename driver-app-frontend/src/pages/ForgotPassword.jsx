import React, { useState } from "react";
import axios from 'axios';
import { Link, withRouter } from "react-router-dom";


export default function ForgotPassword(){


  const [qs, setQs] = useState([]);


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

  function resetPassword(){
    let username = document.getElementById("username").value;
    let newpw = document.getElementById("newpw").value;
    let q = document.getElementById("qselect").value;
    let ans = document.getElementById("ans").value;
    const mjson = {
      username: username,
      newpw: polynomialRollingHash(newpw).toString(),
      q: q,
      ans: ans,
    };

    axios.post('http://localhost:8081/resetPassword', mjson)

  }



  function getSecQuestion(){
      let username = document.getElementById("username").value;
      const mjson = {
        username: username,
      }
      axios.post('http://localhost:8081/getSecQuestion', mjson)
      .then((response) => {
        setQs(response.data);
        console.log(qs[0].SecurityQuestion1);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const populateIDList= () =>{
    let options = [];
    options.push(<option value='empty'>Select A Question</option>)

    for (let i in qs){
      options.push(<option value={qs[i].SecurityQuestion1}>{`${qs[i].SecurityQuestion1}`}</option>)
      options.push(<option value={qs[i].SecurityQuestion2}>{`${qs[i].SecurityQuestion2}`}</option>)
    }

    return options;
  }



  return (
    <div>
    <center>
      <label htmlFor="username">Username</label>
      <input id='username' type='text'/>
      <br></br>
      <button onClick={getSecQuestion}>Load Security Questions </button>
      <br></br>
      <select id="qselect">
      {populateIDList()}
      </select>
      <label htmlFor="answer">Security Question Answer</label>
      <input id='ans' type='text'/>
      <br></br>
      <label htmlFor="pw">New Password </label>
      <input id='newpw' type='text'/>
      <br></br>
      <button onClick={resetPassword}> Reset Password </button>


    </center>
    </div>
  )

}
