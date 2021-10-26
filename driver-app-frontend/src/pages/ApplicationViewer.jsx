import React from "react";
import axios from "axios";

export default function ApplicationViewer(){

    const loadQuestions = () => {
        let SponsorID = 0;
        axios.get('http://localhost:8081/fetchQuestions', SponsorID)
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
        document.getElementById("AppQ1").innerHTML = "Test Question pls work";
    }
    
    const onCancel = () =>{
      window.location.replace("/SponsorDashboard")
    }

    const onFormSubmit = () =>{

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
        <button onClick={onFormSubmit}>fakeSubmit</button>
        <button onClick={onCancel}> Cancel</button>
    </div>  
      )
  
    }