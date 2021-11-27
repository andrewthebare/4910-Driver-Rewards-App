import React from "react";
import axios from "axios";

export default function ApplicationChoice(){

  const onApproval = () => {
    console.log("approve")
  }

  const onDenial = () => {
    console.log("deny")
}

  const onCancel = () =>{
    //window.location.replace("/SponsorDashboard")
  }

  const onFormFetch = () =>{
    let SponsorID = 0;
    let sponsIDjson = {SponsorID: SponsorID}
    
    var tbl = document.getElementById('table');
    if (tbl.rows.length <= 1) {
        axios.get('http://ec2-52-91-166-21.compute-1.amazonaws.com:3000/fetchApplication', {params: sponsIDjson})
        .then(function(response){
            console.log('fetch', response);
            let data = response.data;
            console.log('Returned Data', data);

            var table = document.getElementById('table');
            data.forEach(function(object) {
                var tr = document.createElement('tr');
                let obj1 = JSON.stringify(object.ApplicationAns).replace(/[,]/g, '\n')
                let obj2 = obj1.replace(/[\\]/g, '')
                console.log('Nice Print', obj2)
                tr.innerHTML = '<td>' + object.UserID + '</td>' +
                    '<td>' + obj2 + '</td>' +
                    '<td>' + '<input id="Approve" type="button" value="Approve">'+ 
                    '<td>' + '<input id="Deny" type="button" value="Deny" />'+ '</td>' ;
                table.appendChild(tr);
                });
        
        })
        
    }

  }

  return(    
      <div>
        <h3>Driver Applications</h3>
        <button onClick={onFormFetch}>Load Applications</button><br/>
        <table align="center" styles="margin: 0px auto;" id="table">
        <tr>
            <th>UserID</th>
            <th>Question Answers</th>
            <th>Approve</th>
            <th>Deny</th>
        </tr>
    </table>
      <span id="error"></span><br/>
      <button onClick={onCancel}> Return</button>
    </div>  
    )

  }