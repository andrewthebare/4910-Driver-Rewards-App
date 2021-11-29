import React from "react";
import { Link, withRouter } from "react-router-dom";
import './DriverDashboard.css';
import DashboardCard from "./components/DashboardCard";

export default function DriverDashboard(){
  var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  var driver = false;
  var userType = 3;
  userType = userInfo.userType;
  if(userType === 2 || userType === 1 || userType === 0){
    driver = true;
  }

   return(
    <div>
      <h1> Driver Dashboard </h1>

      {driver &&<div className='dashHolder'>
        <DashboardCard text='View Catalog' to="/catalog" src='https://images.pexels.com/photos/3160544/pexels-photo-3160544.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' />
        <DashboardCard text='Apply To Sponsor' to="/ApplicationSubmit" src='https://images.pexels.com/photos/5387266/pexels-photo-5387266.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' />
        <DashboardCard text='Settings' to="/Settings" src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.goodfreephotos.com%2Fcache%2Fother-photos%2Fhanging-clock-on-building.jpg&f=1&nofb=1' />
        <DashboardCard text='Edit Profile' to="/Profile/EditProfile" src='https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' />
      </div>}
    </div>
  )
}
