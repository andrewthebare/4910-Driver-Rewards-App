import React from "react";
import { Link, withRouter } from "react-router-dom";
import './DriverDashboard.css';
import DashboardCard from "./components/DashboardCard";

export default function DriverDashboard(){

 
   return(
    <div>
      <h1> Driver Dashboard </h1>

      <div className='dashHolder'>
        <DashboardCard text='View Points' to="/Error" src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.gettyimages.com%2Fphotos%2Fhandshake-picture-id487252293%3Fb%3D1%26k%3D6%26m%3D487252293%26s%3D612x612%26w%3D0%26h%3DLiKW3FD5zo1I81qCE2M5twalu1nfxUIG1VfhPOzVg6w%3D&f=1&nofb=1' />
        <DashboardCard text='View Catalog' to="/catalog" src='https://images.pexels.com/photos/3160544/pexels-photo-3160544.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' />
        <DashboardCard text='Settings' to="/Settings" src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.goodfreephotos.com%2Fcache%2Fother-photos%2Fhanging-clock-on-building.jpg&f=1&nofb=1' />
        <DashboardCard text='Edit Profile' to="/Profile/EditProfile" src='https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' />
      </div>
    </div>
  )
}
 
 