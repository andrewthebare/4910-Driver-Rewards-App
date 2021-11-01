import axios from "axios";
import {React, useState, useEffect} from "react";
import './styles/CatalogStyle.css'

export default function CatalogDisplay(){
  const useMountEffect = (fun) => useEffect(fun, [])

  const [catalogItems, setItems] = useState([{id: -1, selected: true, name: 'Test Item', price: 100.25},{id: -2, selected: false, name: 'Test False Item', price: 30.50}])
  const [query, setQuery] = useState('');
  const [price, setPrice] = useState();
  let ascending;

  const SortCatalog = ()=>{
    console.log('cat Items', catalogItems);

    let newOrder;
    if(!ascending){
      newOrder = catalogItems.sort(function(a,b){
        return a.price-b.price;
      })

      // setItems(newOrder);

      console.log('new', newOrder);
    }
  }

  function handleInput(event) {
    setQuery(event.target.value );  
  };
  function handlePriceInput(event) {
    setPrice(event.target.value );  
  };

  const fetchProductData = () =>{
    ascending = false;

    axios.post('http://localhost:8081/fetchCatalog', {query:query, price: price})
    .then(function(response){
      console.log('fetch', response);

      let data = response.data;

      setItems(data)

    })
  }

  const fillTableItems = () =>{
    console.log('drawing items', catalogItems);
    let rows = [];

    for (let i in catalogItems){
      let item = catalogItems[i];

      //TODO regex the title and take just the first one
      rows.push(
      <tr className="catalogRow basic">
        {/* <td><input type='checkbox' checked={item.selected}/></td> */}
        <td><a href={item.url}><img class='catItem' src={item.MainImage? item.MainImage.url_170x135 : null}/></a></td>
        <td>{item.title}</td>
        <td>${item.price}</td>
        <td><button>Buy</button></td>
      </tr>
      )
    }

    return rows;
  }

  useMountEffect(fetchProductData)


  return(
    <div>
      <div className={"holder"}>
        <div className="flexItem">
          <label for="queryInput">Search</label>
          <input id="queryInput" className="rounded" onChange={handleInput} onKeyUp={(e)=> {console.log(e,e); if(e.key==='Enter'){fetchProductData()}}} type="text" />
          <label for="priceInput">Max Price</label>
          <input id="priceInput" className="rounded" onChange={handlePriceInput} onKeyUp={(e)=> {console.log(e,e); if(e.key==='Enter'){fetchProductData()}}} type="number" />
          <button className="rounded" onClick={fetchProductData}>Search</button>
        </div>
        <div>
          <div className={'pointHolder'}>
            <div style={{textAlign: 'center'}}>
              <h2>Points</h2>
              <h4>$3.40</h4>
            </div>
          </div>
        </div>
      </div>
      <table className={'catalog rounded'}>
        <tr className="catalogRow">
          <th>Picture</th>
          <th>Item</th>
          <th>Price <button onClick={SortCatalog}>Sort</button></th>
          <th></th>
        </tr>
        {fillTableItems()}
      </table>
    </div>
  )
}