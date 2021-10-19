import React from "react";
import { Link, withRouter } from "react-router-dom";
import './Navigation.css';


function Navigation(props) {
  var first;
  var last;
  try{
    var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    first = userInfo.FirstName;
    last = userInfo.LastName;
  }
  catch (error){
    first = "Good Driver";
    last = "Incentive";
  }
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container">
          <Link class="navbar-brand" to="/">
            {first} {last}
            {/* Good Driver Incentive */}
          </Link>

          <div>
            <ul class="navbar-nav ml-auto">
              <li
                class={`nav-item  ${
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/">
                  Home
                  <span class="sr-only">(current)</span>
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/adminDashboard">
                  Admin Dashboard
                  <span class="sr-only">(current)</span>
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/DriverDashboard" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/DriverDashboard">
                  Driver Dashboard
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/SponsorDashboard" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/SponsorDashboard">
                  Sponsor Dashboard
                </Link>
              </li>

              <li
                class={`nav-item  ${
                  props.location.pathname === "/about" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/Messaging">
                  Messaging
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/Login">
                  Login
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/SecurityQuestions">
                  Security Questions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);
