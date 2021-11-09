import React from "react";
import { Link, withRouter } from "react-router-dom";
import './SponsorDashboard.css';
import DashboardCard from "./components/DashboardCard";
export default function SponsorDashboard(){

  return(
    <div>
      <h1> Sponsor Dashboard </h1>
      <div className='dashHolder'>
        <DashboardCard text='View Drivers' to="/SponsorViewDrivers" src='https://images.pexels.com/photos/7046402/pexels-photo-7046402.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' />
        <DashboardCard text='Manage Catalog' to="/sponsorDashboard/editCatalog" src='https://images.pexels.com/photos/3160544/pexels-photo-3160544.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' />
        <DashboardCard text='Edit Profile' to="/Profile/EditProfile" src='https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' />
        <DashboardCard text='Settings' to="/Settings" src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.goodfreephotos.com%2Fcache%2Fother-photos%2Fhanging-clock-on-building.jpg&f=1&nofb=1' />
      </div>
    </div>
  )
}
