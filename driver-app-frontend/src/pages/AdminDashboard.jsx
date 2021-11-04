import React from "react";
import { Link, withRouter } from "react-router-dom";
import './AdminDashboard.css';
import DashboardCard from "./components/DashboardCard";
export default function AdminDashboard(){

  return(
    <div>
      <h1> Administrator Dashboard </h1>

      <div className='gridHolder'>
        <DashboardCard src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F1%2F19%2F%25C3%2581guila_calva.jpg&f=1&nofb=1' to="/adminDashboard/createUser"/>
        <div className='dashHolder reverse'>
          <div className='content'>This is content</div>
          <button className= "btn2" >
            <Link class="adminButton" to="/adminDashboard/editUser">
              Edit User
              <span class="sr-only">(current)</span>
            </Link>
          </button>
        </div>
      </div>

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
