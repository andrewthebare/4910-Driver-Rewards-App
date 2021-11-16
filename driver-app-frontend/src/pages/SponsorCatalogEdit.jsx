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
  var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  var sponsor = false;
  var userType = 3; 
  userType = userInfo.userType;
  if(userType === 1 || userType === 0){
    sponsor = true;
  }
  return(
    <div>
      {sponsor && <h1>Edit Items found in the Catalog</h1>}

      {sponsor &&<input id='keywords' type="text" defaultValue={query.keywords} onChange={handleInput} />}
      {sponsor &&<p>Default Search Query</p>}
      {sponsor &&<input id='limit' type="number" defaultValue={query.limit} onChange={handleInput}/>}
      {sponsor && <p>Number of Items</p>}
      {sponsor &&<input id='max_price' type="number" defaultValue={query.max_price} onChange={handleInput}/>}
      {sponsor &&<p>Max Price</p>}
      <br/>
      {sponsor &&<button onClick={fetchQuery}>Fill Boxes with current Query</button>}
      {sponosr &&<button onClick={setSponsorQuery}>Set Query</button>}
    </div>
  )
}