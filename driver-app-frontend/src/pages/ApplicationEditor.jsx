//Clue Mediator Dynamic Input Fields
import React, { useState } from "react";


export default function ApplicationEditor(){
    
    const [inputList, setInputList] = useState([{ question: "", required: false}]);
 
    // handle input change
    const handleInputChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...inputList];
      list[index][name] = value;
      setInputList(list);
    };
   
    // handle click event of the Remove button
    const handleRemoveClick = index => {
      const list = [...inputList];
      list.splice(index, 1);
      setInputList(list);
    };
   
    // handle click event of the Add button
    const handleAddClick = () => {
      setInputList([...inputList, { question: "", required: false}]);
    };
   
    return (
      <div className="ApplicationEditor">
        <h3>Application Creation</h3>
        {inputList.map((x, i) => {
          return (
            <div className="questionBox">
              <label>Question for the Application?</label>  
              <input
                name="question"
                placeholder="Question"
                value={x.question}
                onChange={e => handleInputChange(e, i)}
              />
              <label>Required?</label>
              <input
                className="checkBox"
                type="checkbox"
                name="required"
              />
              <div className="buttonsForApplication">
                {inputList.length !== 1 && <button className="RemoveButton" onClick={() => handleRemoveClick(i)}>Remove</button>}
                {inputList.length - 1 === i && <button className="AddButton" onClick={handleAddClick}>Add</button>}                
              </div>
            </div>
          );
        })}
      </div>
    );
  }