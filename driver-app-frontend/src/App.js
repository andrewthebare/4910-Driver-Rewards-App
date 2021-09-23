import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Home, About, Contact, AdminDashboard, CreateUser, Login, Profile, SecurityQuestions, Error, EditProfile, AdminEditUser } from "./pages";
// import { Navigation, Home, About, Contact, AdminDashboard, CreateUser, Login, Profile, Error } from "./pages";
// import { Navigation, Home, About, Contact, AdminDashboard, CreateUser, Login, Profile, EditProfile } from "./pages";

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
          <Route path="/Login" exact component={() => <Login />} />
          <Route path="/Profile" exact component={() => <Profile />} />
          <Route path="/SecurityQuestions" exact component={() => <SecurityQuestions />} />

          <Route Path="/Error" exact component={() => <Error />} />
          <Route path="/Profile/EditProfile" exact component={() => <EditProfile />} />
	      </Switch>
      </Router>
    </div>
  );
}

export default App;