import React from "react";
import { Link, withRouter } from "react-router-dom";
import './DriverDashboard.css';
export default function DriverDashboard(){

  return(
    <div>
      <center>
      <h1> Driver Dashboard </h1>
      <table class = "driverTable">
        <tr>
          <td>
            <button className= "btn3">
              <Link class="driverButton" to="/Error">
                View Points
                <span class="sr-only">(current)</span>
              </Link>
            </button>
          </td>
          <td>
          <button className= "btn3">>
            <Link class="driverButton" to="/catalog">
              Catalog
              <span class="sr-only">(current)</span>
            </Link>
          </button>
        </td>
        </tr>
        <tr>
          <td>
            <button className= "btn3">
              <Link class="driverButton" to="/Error">
                Username Reset
              <span class="sr-only">(current)</span>
              </Link>
            </button>
          </td>
          <td>
            <button className= "btn3">
              <Link class="userButton" to="/Error">
                Password Reset
              <span class="sr-only">(current)</span>
              </Link>
            </button>
          </td>
        </tr>
        <tr>
        <td>
          <button className= "btn3">
            <Link class="userButton" to="/">
              Logout
            <span class="sr-only">(current)</span>
            </Link>
          </button>
        </td>
        <td>
          <button className= "btn3">
            <Link class="userButton" to="/Error">
              Placeholder
            <span class="sr-only">(current)</span>
            </Link>
          </button>
        </td>
        </tr>
      </table>
      </center>
    </div>
  )
}
