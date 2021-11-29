import axios from "axios";
import {React, useState, useEffect} from "react";
import CatalogItem from "./components/CatalogItem";
import './styles/CatalogStyle.css'

export default function CatalogDisplay(){
  const useMountEffect = (fun) => useEffect(fun, [])

  const[userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo")))
  const [catalogItems, setItems] = useState([{id: -1, selected: true, name: 'Test Item', price: 100.25},{id: -2, selected: false, name: 'Test False Item', price: 30.50}])
  const [query, setQuery] = useState('');
  const [price, setPrice] = useState();
  let ascending;

  const updateUser = ()=>{
    axios.post('http://ec2-52-91-166-21.compute-1.amazonaws.com:3000/oneUser', {userID: userInfo.UserID})
    .then(function(response){
      //probably shouldn't pull down the whole user, but I'm lazy
      console.log('user', response);

      setUserInfo(response.data)
    })
  }

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

    axios.post('http://ec2-52-91-166-21.compute-1.amazonaws.com:3000/fetchCatalog', {query:query, price: price})
    .then(function(response){
      console.log('fetch', response);

      let data = response.data;

      setItems(data)

    });

    updateUser();

  }

  const fillTableItems = () =>{

    console.log('Storage', userInfo);
    let rows = [];

    for (let i in catalogItems){
      let item = catalogItems[i];

      //TODO regex the title and take just the first one
      rows.push(
        <CatalogItem item={item} user={userInfo.UserID}/>
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
              <h4>${userInfo.Points}</h4>
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