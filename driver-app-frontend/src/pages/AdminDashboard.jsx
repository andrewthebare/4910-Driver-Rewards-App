import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard(){

  return(
    <div>
      <button>
        <Link class="nav-link" to="/adminDashboard/createUser">
          Create User
          <span class="sr-only">(current)</span>
        </Link>
      </button>
      <button>
        <Link class="nav-link" to="/adminDashboard/editUser">
          Edit User
          <span class="sr-only">(current)</span>
        </Link>
      </button>
    </div>
  )
}