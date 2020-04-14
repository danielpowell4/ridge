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
  MaterialRequests,
  Referrals,
  SummaryTurnaround,
  Projections
} from "./components";

const Landing = _ => <div>Select a category...</div>;

const App = _ => (
  <Router>
    <div style={{ marginBottom: "2rem" }}>
      <MainMenu />
      <main style={{ padding: "1rem 0" }}>
        <Route path="/employees" component={Employees} />
        <Route path="/tasks" component={Tasks} />
        <Route path="/column" component={Column} />
        <Route path="/histogram" component={Histogram} />
        <Route path="/timegraph" component={Timegraph} />
        <Route path="/lesson-turnaround" component={SummaryTurnaround} />
        <Route path="/material-requests" component={MaterialRequests} />
        <Route path="/referrals" component={Referrals} />
        <Route path="/projections" component={Projections} />
        <Route exact path="/" component={Landing} />
      </main>
    </div>
  </Router>
);

export default App;
