import React from "react";
import { Link, withRouter } from "react-router-dom";
import './SponsorDashboard.css';
export default function SponsorDashboard(){

  return(
    <div>
      <center>
      <h1> Sponsor Dashboard </h1>

            <button className= "btn2">
              <Link class="sponsorButton" to="/SponsorViewDrivers">
                View Drivers
                <span class="sr-only">(current)</span>
              </Link>
            </button>

          <button className= "btn2">
            <Link class="sponsorButton" to="/sponsorDashboard/editCatalog">
              Catalog
              <span class="sr-only">(current)</span>
            </Link>
          </button>

            <button className= "btn2">
              <Link class="sponsorButton" to="/Error">
                Username Reset
              <span class="sr-only">(current)</span>
              </Link>
            </button>

            <button className= "btn2">
              <Link class="sponsorButton" to="/Error">
                Password Reset
              <span class="sr-only">(current)</span>
              </Link>
            </button>

          <button className= "btn2">
            <Link class="sponsorButton" to="/sponsorDashboard/AddSponsor">
              Add Sponsor
            <span class="sr-only">(current)</span>
            </Link>
          </button>

          <right>
          <button className= "btn3">
            <Link class="adminButton" to="/Error">
              Logout
            <span class="sr-only">(current)</span>
            </Link>
          </button>
      </right>

      </center>
    </div>
  )
}
