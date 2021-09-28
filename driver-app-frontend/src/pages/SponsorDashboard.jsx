import React from "react";
import { Link, withRouter } from "react-router-dom";
import './SponsorDashboard.css';
export default function SponsorDashboard(){

  return(
    <div>
      <center>
      <h1> Sponsor Dashboard </h1>
      <table class = "sponsorTable">
        <tr>
          <td>
            <button>
              <Link class="sponsorButton" to="/Error">
                View Drivers
                <span class="sr-only">(current)</span>
              </Link>
            </button>
          </td>
          <td>
          <button>
            <Link class="sponsorButton" to="/Error">
              Catalog
              <span class="sr-only">(current)</span>
            </Link>
          </button>
        </td>
        </tr>
        <tr>
          <td>
            <button>
              <Link class="sponsorButton" to="/Error">
                Username Reset
              <span class="sr-only">(current)</span>
              </Link>
            </button>
          </td>
          <td>
            <button>
              <Link class="sponsorButton" to="/Error">
                Password Reset
              <span class="sr-only">(current)</span>
              </Link>
            </button>
          </td>
        </tr>
        <tr>
        <td>
          <button>
            <Link class="sponsorButton" to="/">
              Driver View
            <span class="sr-only">(current)</span>
            </Link>
          </button>
        </td>
        <td>
          <button>
            <Link class="userButton" to="/Error">
              Logout
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
