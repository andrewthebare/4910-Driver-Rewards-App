import React from 'react';
import axios from 'axios';

export default function SecurityQuestions(){
  var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  console.log('userInfo: ', userInfo);
  function SubButton(){
    let userID = userInfo.UserID;
    let secureQ1 = document.getElementById("Security Question 1").value;
    let secureA1 = document.getElementById("Security Question 1 Answer").value;
    let secureQ2 = document.getElementById("Security Question 2").value;
    let secureA2 = document.getElementById("Security Question 2 Answer").value;

    const securityQA = {
      userID: userID,
      secureQ1: secureQ1,
      secureA1: secureA1,
      secureQ2: secureQ2,
      secureA2: secureA2,
    };

    axios.post('http://ec2-52-91-166-21.compute-1.amazonaws.com:3000/SecurityQuestions', securityQA)
        .then(function (response) { //this part waits and plays out when a response is recieved, it's asynchronous
          console.log(response);
          if (response.status === 200){
            alert("Security Questions Successfully Submitted");
            window.location= "http://localhost:3000/Profile";
            return false;
          }else{
            alert("Please Try Again")
            window.location= "http://localhost:3000/SecurityQuestions";
            return false;
          }
        })


  }

  return(    
      <div>
        <h3>Security Questions</h3>
        

          <label htmlFor="Security Question 1">Security Question 1</label>
          <input id='Security Question 1' type='text'/><br/>
          <label htmlFor="Security Question 1 Answer">Security Question 1 Answer</label>
          <input id='Security Question 1 Answer' type='text'/><br/><br/>
          <label htmlFor="Security Question 2">Security Question 2</label>
          <input id='Security Question 2' type='text'/><br/>
          <label htmlFor="Security Question 2 Answer">Security Question 2 Answer</label>
          <input id='Security Question 2 Answer' type='text'/><br/><br/>
      
      <button onClick={SubButton}>Submit</button>
    </div>  
    )
  //edited

}