import axios from "axios";
import {React, useState, useEffect} from "react";

export default function SponsorCatalogManage(){
  const useMountEffect = (fun) => useEffect(fun, [])

  const [catalogItems, setItems] = useState([{id: -1, selected: true, name: 'Test Item', price: 100.25},{id: -2, selected: false, name: 'Test False Item', price: 30.50}])

  const fetchProductData = () =>{
    axios.get('http://localhost:8081/fetchCatalog', {})
    .then(function(response){
      console.log('fetch', response);

      let data = response.data;

      setItems(data)

    })
  }

  const fillTableItems = () =>{
    let rows = [];

    for (let i in catalogItems){
      let item = catalogItems[i];

      //TODO
      rows.push(
      <tr>
        <td><input type='checkbox' checked={item.selected}/></td>
        <td>{item.title}</td>
        <td><a href={item.url}>LINK</a></td>
        <td>{item.price}</td>
      </tr>
      )
    }

    return rows;
  }

  // useMountEffect(fetchProductData)


  return(
    <div>
      <h1>Sponsor Catalog</h1>
      <table>
        <tr>
          <th>Selected</th>
          <th>Item</th>
          <th>Link</th>
          <th>Price</th>
        </tr>
        {fillTableItems()}
      </table>
      <button onClick={()=> fetchProductData()}>Push</button>
    </div>
  )
}