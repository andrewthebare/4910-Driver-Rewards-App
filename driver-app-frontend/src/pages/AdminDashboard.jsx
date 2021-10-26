import React from "react";
import { Link, withRouter } from "react-router-dom";
import './AdminDashboard.css';
export default function AdminDashboard(){

  return(
    <div>
      <screenLeft>
      <h1> Administrator Dashboard </h1>
      </screenLeft>

      <screenLeft>
            <button className= "btn2">
              <Link class="adminButton" to="/adminDashboard/createUser">
                Create User
                <span class="sr-only">(current)</span>
              </Link>
            </button>
        </screenLeft> 
      
      <screenLeft>   
            <button className= "btn2" >
              <Link class="adminButton" to="/adminDashboard/editUser">
                Edit User
                <span class="sr-only">(current)</span>
            </Link>
          </button>
      </screenLeft>

      <center>
            <button className= "btn2">
              <Link class="adminButton" to="/adminDashboard/Logs">
                View Logs
              <span class="sr-only">(current)</span>
              </Link>
            </button>
      </center>

      <center>
            <button className= "btn2">
              <Link class="adminButton" to="/adminDashboard/manageCatalog">              
                Catalog
              <span class="sr-only">(current)</span>
              </Link>
            </button>
      </center>

      <right>
          <button className= "btn3">
            <Link class="adminButton" to="/Error">
              Logout
            <span class="sr-only">(current)</span>
            </Link>
          </button>
      </right>

      <screenLeft>
          <button className= "btn2">
            <Link class="adminButton" to="/Error">
              Placeholder
            <span class="sr-only">(current)</span>
            </Link>
          </button>
      </screenLeft>
    </div>
  )
}
