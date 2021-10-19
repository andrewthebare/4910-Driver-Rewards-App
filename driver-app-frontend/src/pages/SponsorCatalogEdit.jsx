import axios from "axios";
import {React, useState} from "react";

export default function SponsorEditCatalog(){
  const [query, setQuery] = useState({});

  function handleInput(event) {
    let newQuery = query;
    newQuery[event.target.id] = event.target.value;
    setQuery(newQuery);
  };


  const fetchQuery = ()=>{
    console.log('fetch!')

    axios.get('http://localhost:8081/getCatalogQuery',{params:{id: 0}})
    .then(function(response){
      
      let data = response.data;
      
      if (data){
        console.log(data);
        setQuery(data);
      }
    })
  }

  const setSponsorQuery = () =>{
    axios.put('http://localhost:8081/setCatalogQuery',{id: 0, data: query})
    .then(function(response){
      console.log(response);
    })
  }

  return(
    <div>
      <h1>Edit Items found in the Catalog</h1>

      <p>Default Key Words</p>
      <input id='keywords' type="text" defaultValue={query.keywords} onChange={handleInput} />
      <p>Number of Items</p>
      <input id='limit' type="number" defaultValue={query.limit} onChange={handleInput}/>
      <p>Max Price</p>
      <input id='max_price' type="number" defaultValue={query.max_price} onChange={handleInput}/>

      <button onClick={fetchQuery}>testPull</button>
      <button onClick={setSponsorQuery}>test Push</button>
    </div>
  )
}