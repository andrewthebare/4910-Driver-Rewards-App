import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Home, About, Contact, AdminDashboard, CreateUser } from "./pages";
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;