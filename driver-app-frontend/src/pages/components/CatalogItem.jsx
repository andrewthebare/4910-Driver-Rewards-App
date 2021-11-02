import axios from "axios";
import React from "react";

export default function CatalogItem(props){
  const item = props.item;
  const userID = props.user;

  const purchase = ()=>{
    console.log('im buying '+ item.title);

    axios.post('http://localhost:8081/buyItem', {item:item, user:userID})
    .then(function(response){

      response.data.enough?alert('Purchase Successful'):alert('You do not have enough points');
      
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