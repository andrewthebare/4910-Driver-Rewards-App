import React from "react";
import axios from "axios";

export default function ApplicationCreation(){

  const onFormSubmit = () => {
    var error = document.getElementById("error")
    let sponsID = 0;

    let app1 = document.getElementById("AppQ1").value;
    let app2 = document.getElementById("AppQ2").value;
    let app3 = document.getElementById("AppQ3").value;
    let app4 = document.getElementById("AppQ4").value;
    let app5 = document.getElementById("AppQ5").value;
    let app6 = document.getElementById("AppQ6").value;
    let app7 = document.getElementById("AppQ7").value;
    let app8 = document.getElementById("AppQ8").value;
    let app9 = document.getElementById("AppQ9").value;
    let app10 = document.getElementById("AppQ10").value;

    if (app1 === ''|| app2 === ''||app3 === ''||app4 === ''||app5 === ''||app6 === ''||app7 === ''||app8 === ''||app9 === ''||app10 === '') 
        {
            error.textContent = "Please fill out all Questions"
            error.style.color = "red"
            return;
        } else {
            error.textContent = ""
        }
    const applicationQuestions = {
      SponsorID: sponsID, 
      q1: app1,
      q2: app2,
      q3: app3,
      q4: app4,
      q5: app5,
      q6: app6,
      q7: app7,
      q8: app8,
      q9: app9,
      q10: app10
    }
    /*
    NEEDS TO BE FIXED: "ERROR_INVALID_JSON_TEXT at pos1 on serverside"
    axios.post('http://localhost:8081/applicationUpdate', applicationQuestions)
    .then(function (response) { //this part waits and plays out when a response is recieved, it's asynchronous
      console.log("response is:", response);
      var result = response.data[0];
      console.log("object:", result);
      if (response.status === 200){
        //sessionStorage.setItem("userInfo", JSON.stringify(result));
        //console.log("test: ", test);
        alert("Questions Updated Successfully");
        window.location.replace("/SponsorDashboard");
      }
    })*/

    console.log('Questions', applicationQuestions);
  }
  
  const onCancel = () =>{
    window.location.replace("/SponsorDashboard")
  }

  return(    
      <div>
        <h3>Security Questions</h3>
        { <form onSubmit={onFormSubmit}>

          <label htmlFor="Application Question 1">Application Question 1</label>
          <input id='AppQ1' type='text'/><br/><br/>

          <label htmlFor="Application Question 2">Application Question 2</label>
          <input id='AppQ2' type='text'/><br/><br/>

          <label htmlFor="Application Question 3">Application Question 3</label>
          <input id='AppQ3' type='text'/><br/><br/>

          <label htmlFor="Application Question 4">Application Question 4</label>
          <input id='AppQ4' type='text'/><br/><br/>

          <label htmlFor="Application Question 5">Application Question 5</label>
          <input id='AppQ5' type='text'/><br/><br/>

          <label htmlFor="Application Question 6">Application Question 6</label>
          <input id='AppQ6' type='text'/><br/><br/>

          <label htmlFor="Application Question 7">Application Question 7</label>
          <input id='AppQ7' type='text'/><br/><br/>

          <label htmlFor="Application Question 8">Application Question 8</label>
          <input id='AppQ8' type='text'/><br/><br/>

          <label htmlFor="Application Question 9">Application Question 9</label>
          <input id='AppQ9' type='text'/><br/><br/>

          <label htmlFor="Application Question 10">Application Question 10</label>
          <input id='AppQ10' type='text'/><br/><br/>                 
      </form>}
      <span id="error"></span><br/>
      <button onClick={onFormSubmit}>Submit</button>
      <button onClick={onCancel}> Cancel</button>
    </div>  
    )

  }