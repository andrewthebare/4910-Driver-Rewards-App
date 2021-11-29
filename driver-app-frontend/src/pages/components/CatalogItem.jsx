import axios from "axios";
import React from "react";

export default function CatalogItem(props){
  const item = props.item;
  const userID = props.user;
  var msg = '';
  const purchase = ()=>{
    console.log('im buying '+ item.title);

    axios.post('http://ec2-52-91-166-21.compute-1.amazonaws.com:3000/buyItem', {item:item, user:userID})
    .then(function(response){

      response.data.enough?alert('Purchase Successful'):alert('You do not have enough points');

      if(response.data.enough){
        msg = "You have successfully purchased " + item;
      }
      else{
        msg = "There was a problem purchasing " + item;
      }
      const msgJson = {
        username: userID,
        message: msg,
      };
      axios.post('http://ec2-52-91-166-21.compute-1.amazonaws.com:3000/sendAlertMessage', msgJson)
    })

  }

  return(
    <tr className="catalogRow basic">
      {/* <td><input type='checkbox' checked={item.selected}/></td> */}
      <td><a href={item.url}><img src={item.MainImage? item.MainImage.url_170x135 : null}/></a></td>
      <td>{item.title}</td>
      <td>${item.price}</td>
      <td><button onClick={purchase}> Buy</button></td>
    </tr>
  )
}
