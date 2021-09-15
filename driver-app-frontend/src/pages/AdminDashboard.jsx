import React from "react";
import { Link, withRouter } from "react-router-dom";

export default function AdminDashboard(){

  return(
    <div>
      <button>
        <Link class="nav-link" to="/adminDashboard/createUser">
          Create User
          <span class="sr-only">(current)</span>
        </Link>
      </button>
    </div>
  )
}