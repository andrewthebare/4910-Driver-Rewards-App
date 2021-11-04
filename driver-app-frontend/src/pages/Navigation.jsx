import React from "react";
import { Link, withRouter } from "react-router-dom";
import './Navigation.css';


function Navigation(props) {

  function logOut() {
    if(window.confirm("Are you sure you want to log out?")){
      sessionStorage.removeItem("userInfo");
      window.location.replace("/");
    }
  }


  var first;
  var last;
  var driver = false;
  var sponsor = false;
  var admin = false;
  var loggedIn = false;
  var userType;
  try{
    var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    first = userInfo.FirstName;
    last = userInfo.LastName;
    userType = userInfo.userType;
    if(userType === 0){
      admin = true;
      driver = true;
      sponsor = true;
    }
    else if(userType === 1){
      sponsor = true;
      driver = true;
    }
    else if(userType === 2){
      driver = true;
    }
    loggedIn = true;
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
          </Link>

          <div>
            <ul class="navbar-nav ml-auto">
              {!loggedIn && <li
                class={`nav-item  ${
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/">
                  Home
                  <span class="sr-only">(current)</span>
                </Link>
              </li>}
              {admin && <li
                class={`nav-item  ${
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/adminDashboard">
                  Admin Dashboard
                  <span class="sr-only">(current)</span>
                </Link>
              </li>}
              {driver && <li
                class={`nav-item  ${
                  props.location.pathname === "/DriverDashboard" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/DriverDashboard">
                  Driver Dashboard
                </Link>
              </li>}
              {sponsor && <li
                class={`nav-item  ${
                  props.location.pathname === "/SponsorDashboard" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/SponsorDashboard">
                  Sponsor Dashboard
                </Link>
              </li>}

              {loggedIn && <li
                class={`nav-item  ${
                  props.location.pathname === "/about" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/Messaging">
                  Messaging
                </Link>
              </li>}
              {!loggedIn &&<li
                class={`nav-item  ${
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/Login">
                  Login
                </Link>
              </li>}
              {loggedIn &&<li
                class={`nav-item  ${
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/Profile">
                  Profile
                </Link>
              </li>}
              {loggedIn &&<li
                class="nav-link" onClick={logOut}>Log Out  
              </li>}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);
