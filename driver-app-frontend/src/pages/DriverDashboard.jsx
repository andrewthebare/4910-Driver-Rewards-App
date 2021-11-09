import React from "react";
import { Link, withRouter } from "react-router-dom";
import './DriverDashboard.css';
import DashboardCard from "./components/DashboardCard";

export default function DriverDashboard(){

 
   return(
    <div>
      <h1> Driver Dashboard </h1>

      <div className='dashHolder'>
        <DashboardCard text='View Points' src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.gettyimages.com%2Fphotos%2Fhandshake-picture-id487252293%3Fb%3D1%26k%3D6%26m%3D487252293%26s%3D612x612%26w%3D0%26h%3DLiKW3FD5zo1I81qCE2M5twalu1nfxUIG1VfhPOzVg6w%3D&f=1&nofb=1' to="/Error"/>
        <DashboardCard text='View Users' src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F3874031%2Fpexels-photo-3874031.jpeg%3Fcs%3Dsrgb%26dl%3Dpexels-gustavo-fring-3874031.jpg%26fm%3Djpg&f=1&nofb=1' to="/Error"/>
        <DashboardCard text='View Catalog' src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.goodfreephotos.com%2Fcache%2Fother-photos%2Fhanging-clock-on-building.jpg&f=1&nofb=1' to="/Error"/>
        <DashboardCard text='Username Reset' src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F972887%2Fpexels-photo-972887.jpeg%3Fcs%3Dsrgb%26dl%3Dadult-blur-caucasian-972887.jpg%26fm%3Djpg&f=1&nofb=1' to="/Error"/>
        <DashboardCard text='Placeholder' src='https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.publicdomainpictures.net%2Fpictures%2F150000%2Fvelka%2Ftruck-on-the-road.jpg&f=1&nofb=1' to="/Error"/>
      </div>
    </div>
  )
}
 
 
 /*
  return(
    <div>
      <center>
      <h1> Driver Dashboard </h1>
        <div className="dashboardName">
            <button className= "btn2">
              <Link class="driverButton" to="/Error">
                View Points
                <span class="sr-only">(current)</span>
              </Link>
            </button>
 
          <button className= "btn2">
            <Link class="driverButton" to="/catalog">
              Catalog
              <span class="sr-only">(current)</span>
            </Link>
          </button>

            <button className= "btn2">
              <Link class="driverButton" to="/Error">
                Username Reset
              <span class="sr-only">(current)</span>
              </Link>
            </button>

            <button className= "btn2">
              <Link class="userButton" to="/Error">
                Password Reset
              <span class="sr-only">(current)</span>
              </Link>
            </button>

          <button className= "btn2">
            <Link class="userButton" to="/Error">
              Placeholder
            <span class="sr-only">(current)</span>
            </Link>
          </button>
        </div>
      </center>
    </div>
  )
}
*/
