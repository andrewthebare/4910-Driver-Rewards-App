import React from "react";
import { Link, withRouter } from "react-router-dom";
import './AdminDashboard.css';
export default function AdminDashboard(){

  return(
    <div>
      <center>
      <h1> Administrator Dashboard </h1>
      <table class = "adminTable">
        <tr>
          <td>
            <button>
              <Link class="adminButton" to="/adminDashboard/createUser">
                Create User
                <span class="sr-only">(current)</span>
              </Link>
            </button>
          </td>
          <td>
            <button>
              <Link class="adminButton" to="/Error">
                Placeholder
              <span class="sr-only">(current)</span>
              </Link>
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <button>
              <Link class="adminButton" to="/Error">
                Placeholder
              <span class="sr-only">(current)</span>
              </Link>
            </button>
          </td>
          <td>
            <button>
              <Link class="adminButton" to="/Error">
                Placeholder
              <span class="sr-only">(current)</span>
              </Link>
            </button>
          </td>
        </tr>
        <tr>
        <td>
          <button>
            <Link class="adminButton" to="/Error">
              Placeholder
            <span class="sr-only">(current)</span>
            </Link>
          </button>
        </td>
        <td>
          <button>
            <Link class="adminButton" to="/Error">
              Placeholder
            <span class="sr-only">(current)</span>
            </Link>
          </button>
        </td>
        <td>
          <button>
            <Link class="nav-link" to="/adminDashboard/editUser">
              Edit User
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
