import React from 'react';

export default function SecurityQuestions(){

  const onFormSubmit = () => {
    let secureQ1 = document.getElementById("Security Question 1").value;
    let secureA1 = document.getElementById("Security Answer 1").value;
    let secureQ2 = document.getElementById("Security Question 2").value;
    let secureA2 = document.getElementById("Security Answer 2").value;
  }

  return(    
      <div>
        <h3>Security Questions</h3>
        { <form onSubmit={onFormSubmit}>

          <label htmlFor="Security Question 1">Security Question 1</label>
          <input id='Security Question 1' type='text'/><br/>
          <label htmlFor="Security Question 1 Answer">Security Question 1 Answer</label>
          <input id='Security Question 1 Answer' type='text'/><br/><br/>
          <label htmlFor="Security Question 2">Security Question 2</label>
          <input id='Security Question 2' type='text'/><br/>
          <label htmlFor="Security Question 2 Answer">Security Question 2 Answer</label>
          <input id='Security Question 2 Answer' type='text'/><br/><br/>
      </form>}
      <button onClick={onFormSubmit}>Submit</button>
    </div>  
    )
  
}