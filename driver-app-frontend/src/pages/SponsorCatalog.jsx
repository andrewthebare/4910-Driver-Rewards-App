import {React, useState} from "react";

export default function SponsorCatalogManage(){

  const [catalogItems, setItems] = useState([{id: -1, selected: true, name: 'Test Item', price: 100.25},{id: -2, selected: false, name: 'Test False Item', price: 30.50}])


  const fillTableItems = () =>{
    let rows = [];

    for (let i in catalogItems){
      let item = catalogItems[i];

      //TODO
      rows.push(
      <tr>
        <td><input type='checkbox' checked={item.selected}/></td>
        <td>{item.name}</td>
        <td>{item.price}</td>
      </tr>
      )
    }

    return rows;
  }

  return(
    <div>
      <h1>Sponsor Catalog</h1>
      <table>
        <tr>
          <th>Selected</th>
          <th>Item</th>
          <th>Price</th>
        </tr>
        {fillTableItems()}
      </table>
    </div>
  )
}