import React from "react";
import axios from "axios";

export default function ApplicationSubmit(){

    const loadQuestions = () => {
        //Error Message for the top of the page
        var error = document.getElementById("error1")
        //Recieves Sponsor ID from input box, Casts value into a number
        let SponsorID = Number(document.getElementById("SponsorID").value)

        //Error Checking to make sure there is an ID to pass before trying to recieve the questions.
        if(document.getElementById("SponsorID").value === '')
        {
            error.textContent = "Please enter a Sponsor ID"
            error.style.color = "red"
        }
        else{
            let sponsIDjson = {SponsorID: SponsorID}
            console.log(sponsIDjson)
            axios.get('http://ec2-52-91-166-21.compute-1.amazonaws.com:3000/fetchQuestions', {params: sponsIDjson})
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
            .catch(function (error) {   //Error catch and Statement
                var error = document.getElementById("error1")
                error.textContent = "Sponsor ID does not exist"
                error.style.color = "red"
                console.log(error);
               });
        }
                
    }
    
    const onCancel = () =>{
      window.location.replace("/home")
    }

    const onFormSubmit = () =>{
    var error1 = document.getElementById("error1")
    var error2 = document.getElementById("error2")
    let SponsorID = document.getElementById("SponsorID").value;
    let driverID = 1;

    if(SponsorID === '')
        {
            error1.textContent = "Please enter a Sponsor ID"
            error1.style.color = "red"
            return;
        }
    

    let ans1 = document.getElementById("Q1").value;
    let ans2 = document.getElementById("Q2").value;
    let ans3 = document.getElementById("Q3").value;
    let ans4 = document.getElementById("Q4").value;
    let ans5 = document.getElementById("Q5").value;
    let ans6 = document.getElementById("Q6").value;
    let ans7 = document.getElementById("Q7").value;
    let ans8 = document.getElementById("Q8").value;
    let ans9 = document.getElementById("Q9").value;
    let ans10 = document.getElementById("Q10").value;

    if (ans1 === ''|| ans2 === ''||ans3 === ''||ans4 === ''||ans5 === ''||ans6 === ''||ans7 === ''||ans8 === ''||ans9 === ''||ans10 === '') 
        {
            error2.textContent = "Please fill out all Questions"
            error2.style.color = "red"
            return;
        } else {
            error2.textContent = ""
        }
    SponsorID = parseInt(SponsorID, 10)
    
    const applicationAnswers = {
      SponsorID: SponsorID,
      DriverID: driverID, 
      q1: ans1,
      q2: ans2,
      q3: ans3,
      q4: ans4,
      q5: ans5,
      q6: ans6,
      q7: ans7,
      q8: ans8,
      q9: ans9,
      q10: ans10
    }
    
    axios.post('http://ec2-52-91-166-21.compute-1.amazonaws.com:3000/applicationSubmit', applicationAnswers)
    .then(function (response) { //this part waits and plays out when a response is recieved, it's asynchronous
      console.log(response);
      if (response.status === 200){
        alert("Answers Submitted Successfully");
        //window.location.replace("/SponsorDashboard");
      }
    })
    .catch(function (error) {   //Error catch and Statement
        var error = document.getElementById("error1")
        error.textContent = "Incorrect SponsorID"
        error.style.color = "red"
        console.log(error);
    })
}
  
    return(    
    <div>
        <h3>Application Questions</h3>
        <span id="error1"></span><br/>
        <button onClick={loadQuestions}>Load Questions</button>
        <input id="SponsorID" type='number' min='0' placeholder="Sponsor ID Number"/>
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
        <span id="error2"></span><br/>
        <button onClick={onFormSubmit}>Submit</button>
        <button onClick={onCancel}> Cancel</button>
    </div>  
      )
  
    }