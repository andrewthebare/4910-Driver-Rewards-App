import React from "react";
import { Link, withRouter } from "react-router-dom";
import './AdminDashboard.css';
import DashboardCard from "./components/DashboardCard";
export default function AdminDashboard(){
  var userType = 3;
  var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  var admin = false;
  userType = userInfo.userType;
  console.log('usertype = ', userType);
  if(userType === 0){
    admin = true;
  }
  return(
    <div>
      <h1> Administrator Dashboard </h1>

      {admin && <div className='dashHolder'>
        <DashboardCard text='Create User' src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.gettyimages.com%2Fphotos%2Fhandshake-picture-id487252293%3Fb%3D1%26k%3D6%26m%3D487252293%26s%3D612x612%26w%3D0%26h%3DLiKW3FD5zo1I81qCE2M5twalu1nfxUIG1VfhPOzVg6w%3D&f=1&nofb=1' to="/adminDashboard/createUser"/>
        <DashboardCard text='Manage Users' src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F3874031%2Fpexels-photo-3874031.jpeg%3Fcs%3Dsrgb%26dl%3Dpexels-gustavo-fring-3874031.jpg%26fm%3Djpg&f=1&nofb=1' to="/adminDashboard/editUser"/>
        <DashboardCard text='View Logs' src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.goodfreephotos.com%2Fcache%2Fother-photos%2Fhanging-clock-on-building.jpg&f=1&nofb=1' to="/adminDashboard/Logs"/>
        <DashboardCard text='Manage Catalog' src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F972887%2Fpexels-photo-972887.jpeg%3Fcs%3Dsrgb%26dl%3Dadult-blur-caucasian-972887.jpg%26fm%3Djpg&f=1&nofb=1' to="/adminDashboard/Logs"/>
        <DashboardCard text='View Sponsor' src='https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.publicdomainpictures.net%2Fpictures%2F150000%2Fvelka%2Ftruck-on-the-road.jpg&f=1&nofb=1' to="/adminDashboard/BillMaker"/>
      </div> }
    </div>
  )
}
