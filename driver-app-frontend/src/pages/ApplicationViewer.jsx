import React from "react";
import axios from "axios";
import App from "../App";

export default function ApplicationViewer(){

    const loadQuestions = () => {
        let SponsorID = 0;
        axios.get('http://ec2-52-91-166-21.compute-1.amazonaws.com:3000/fetchQuestions', SponsorID)
        .then(function(response){
            console.log('fetch', response);

            let data = response.data;
            document.getElementById("AppQ1").innerHTML = data.q1;
            document.getElementById("AppQ2").innerHTML = data.q2;
            document.getElementById("AppQ3").innerHTML = data.q3;
            document.getElementById("AppQ4").innerHTML = data.q4;
            document.getElementById("AppQ5").innerHTML = data.q5;
            document.getElementById("AppQ6").innerHTML = data.q6;
            document.getElementById("AppQ7").innerHTML = data.q7;
            document.getElementById("AppQ8").innerHTML = data.q8;
            document.getElementById("AppQ9").innerHTML = data.q9;
            document.getElementById("AppQ10").innerHTML = data.q10;

    })

    }
    
    const onCancel = () =>{
      window.location.replace("/SponsorDashboard")
    }

    const onFormSubmit = () =>{
      var error = document.getElementById("error")

      let sponsID = 0;
      //Question 1
      if (document.getElementById("Q1").value === "")
      {
          var app1 = document.getElementById("AppQ1").textContent
      }
      else
      {
        var app1 = document.getElementById("Q1").value;
      }

      //Question 2
      if (document.getElementById("Q2").value === "")
      {
          var app2 = document.getElementById("AppQ2").textContent
      }
      else
      {
        var app2 = document.getElementById("Q2").value;
      }

      //Question 3
      if (document.getElementById("Q3").value === "")
      {
          var app3 = document.getElementById("AppQ3").textContent
      }
      else
      {
        var app3 = document.getElementById("Q3").value;
      }

      //Question 4
      if (document.getElementById("Q4").value === "")
      {
          var app4 = document.getElementById("AppQ4").textContent
      }
      else
      {
        var app4 = document.getElementById("Q4").value;
      }

      //Question 5
      if (document.getElementById("Q5").value === "")
      {
          var app5 = document.getElementById("AppQ5").textContent
      }
      else
      {
        var app5 = document.getElementById("Q5").value;
      }
      
      //Question 6
      if (document.getElementById("Q6").value === "")
      {
          var app6 = document.getElementById("AppQ6").textContent
      }
      else
      {
        var app1 = document.getElementById("Q6").value;
      }

      //Question 7
      if (document.getElementById("Q7").value === "")
      {
          var app7 = document.getElementById("AppQ7").textContent
      }
      else
      {
        var app7 = document.getElementById("Q7").value;
      }
      
      //Question 8
      if (document.getElementById("Q8").value === "")
      {
          var app8 = document.getElementById("AppQ8").textContent
      }
      else
      {
        var app8 = document.getElementById("Q8").value;
      }

      //Question 9
      if (document.getElementById("Q9").value === "")
      {
          var app9 = document.getElementById("AppQ9").textContent
      }
      else
      {
        var app9 = document.getElementById("Q9").value;
      }
      
      //Question 10
      if (document.getElementById("Q10").value === "")
      {
          var app10 = document.getElementById("AppQ10").textContent
      }
      else
      {
        var app10 = document.getElementById("Q10").value;
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
      
      axios.post('http://ec2-52-91-166-21.compute-1.amazonaws.com:3000/applicationUpdate', applicationQuestions)
      .then(function (response) { //this part waits and plays out when a response is recieved, it's asynchronous
        console.log(response);
        if (response.status === 200){
          alert("Questions Updated Successfully");
          window.location.replace("/SponsorDashboard");
        }
      })
  
      console.log('Questions', applicationQuestions);
    }
  
    return(    
    <div>
        <h3>Application Question Viewer</h3>
        <button onClick={loadQuestions}>Load Questions</button>
        { <form onSubmit={onFormSubmit}>

          <label id="AppQ1"></label><br/>
          <input id='Q1' type='text'/><br/><br/>

          <label id="AppQ2"></label><br/>
          <input id='Q2' type='text'/><br/><br/>

          <label id="AppQ3"></label><br/>
          <input id='Q3' type='text'/><br/><br/>

          <label id="AppQ4"></label><br/>
          <input id='Q4' type='text'/><br/><br/>

          <label id="AppQ5"></label><br/>
          <input id='Q5' type='text'/><br/><br/>

          <label id="AppQ6"></label><br/>
          <input id='Q6' type='text'/><br/><br/>

          <label id="AppQ7"></label><br/>
          <input id='Q7' type='text'/><br/><br/>

          <label id="AppQ8"></label><br/>
          <input id='Q8' type='text'/><br/><br/>

          <label id="AppQ9"></label><br/>
          <input id='Q9' type='text'/><br/><br/>

          <label id="AppQ10"></label><br/>
          <input id='Q10' type='text'/><br/>
             
      </form>}
        <span id="error"></span><br/>
        <button onClick={onFormSubmit}>Save Question Changes</button>
        <button onClick={onCancel}> Cancel</button>
    </div>  
      )
  
    }