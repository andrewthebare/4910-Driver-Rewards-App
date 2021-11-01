import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Home, About, Contact, AdminDashboard, CreateUser, Login, Profile, SecurityQuestions, Error, EditProfile, AdminEditUser , Settings, Messaging, SendMessage, SponsorGroupMessage,UserDashboard, SponsorDashBoard, DriverDashboard} from "./pages";
import {AdminLogViewer} from "./pages"  //found out we can import like this to avoid merge conflicts
import { CatalogDisplay } from "./pages";
import { SponsorEditCatalog } from "./pages";
import ApplicationCreation from "./pages/ApplicationEditor";
import {SponsorViewDrivers} from "./pages";
import ApplicationViewer from "./pages/ApplicationViewer";

import './App.css'
/**
 * Every Page we create must be listed as a Route with a unique path in this file, with the page
 * imported above and passed as the exact component
 * @returns
 */

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/about" exact component={() => <About />} />
          <Route path="/contact" exact component={() => <Contact />} />
          <Route path="/adminDashboard" exact component={() => <AdminDashboard />} />
          <Route path="/adminDashboard/createUser" exact component={() => <CreateUser />} />
          <Route path="/adminDashboard/editUser" exact component={() => <AdminEditUser />} />
          <Route path="/sponsorDashboard/editCatalog" exact component={() => <SponsorEditCatalog />} />
          <Route path="/catalog" exact component={() => <CatalogDisplay />} />
          <Route path="/Login" exact component={() => <Login />} />
          <Route path="/Profile" exact component={() => <Profile />} />
          <Route path="/SecurityQuestions" exact component={() => <SecurityQuestions />} />
          <Route path="/Settings" exact component={() => <Settings />} />
          <Route path="/adminDashboard/Logs" exact component={() => <AdminLogViewer />} />
          <Route path="/ApplicationCreation" exact component={() => <ApplicationCreation />} />
          <Route path="/ApplicationViewer" exact component={() => <ApplicationViewer />} />
          <Route path="/DriverDashBoard" exact component={() => <DriverDashboard />} />
          <Route path="/SponsorDashBoard" exact component={() => <SponsorDashBoard />} />
          <Route path="/Profile/EditProfile" exact component={() => <EditProfile />} />
          <Route path="/Messaging" exact component={() => <Messaging />} />
          <Route path="/SendMessage" exact component={() => <SendMessage />} />
          <Route path="/SponsorGroupMessage" exact component={() => <SponsorGroupMessage />} />
          <Route path="/SponsorViewDrivers" exact component={() => <SponsorViewDrivers />} />
          <Route Path="/Error" exact component={() => <Error />} /> {/*must be at the buttom*/}

	      </Switch>
      </Router>
    </div>
  );
}

export default App;
