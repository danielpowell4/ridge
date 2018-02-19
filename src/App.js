import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Employees, MainMenu } from "./components";

const Landing = _ => <div>Select a category...</div>;

const App = _ => (
  <Router>
    <div>
      <MainMenu />

      <Route path="/employees" component={Employees} />
      <Route exact path="/" component={Landing} />
    </div>
  </Router>
);

export default App;
