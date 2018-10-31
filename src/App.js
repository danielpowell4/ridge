import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
  Employees,
  Column,
  Tasks,
  MainMenu,
  Timegraph,
  Histogram,
  MaterialRequests
} from "./components";

const Landing = _ => <div>Select a category...</div>;

const App = _ => (
  <Router>
    <div>
      <MainMenu />

      <Route path="/employees" component={Employees} />
      <Route path="/tasks" component={Tasks} />
      <Route path="/column" component={Column} />
      <Route path="/histogram" component={Histogram} />
      <Route path="/timegraph" component={Timegraph} />
      <Route path="/material-requests" component={MaterialRequests} />
      <Route exact path="/" component={Landing} />
    </div>
  </Router>
);

export default App;
