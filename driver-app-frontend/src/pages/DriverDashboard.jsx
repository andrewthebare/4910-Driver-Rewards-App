import React from "react";
import { Link, withRouter } from "react-router-dom";
import './DriverDashboard.css';
export default function DriverDashboard(){

  return(
    <div>
      <center>
      <h1> Driver Dashboard </h1>
        <div className="dashboardName">
            <button className= "btn2">
              <Link class="driverButton" to="/Error">
                View Points
                <span class="sr-only">(current)</span>
              </Link>
            </button>
 
          <button className= "btn2">
            <Link class="driverButton" to="/catalog">
              Catalog
              <span class="sr-only">(current)</span>
            </Link>
          </button>

            <button className= "btn2">
              <Link class="driverButton" to="/Error">
                Username Reset
              <span class="sr-only">(current)</span>
              </Link>
            </button>

            <button className= "btn2">
              <Link class="userButton" to="/Error">
                Password Reset
              <span class="sr-only">(current)</span>
              </Link>
            </button>

          <button className= "btn3">
            <Link class="adminButton" to="/Error">
              Logout
            <span class="sr-only">(current)</span>
            </Link>
          </button>

          <button className= "btn2">
            <Link class="userButton" to="/Error">
              Placeholder
            <span class="sr-only">(current)</span>
            </Link>
          </button>
        </div>
      </center>
    </div>
  )
}
