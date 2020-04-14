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
  Projections,
} from "./components";

const Landing = (_) => <div>Select a category...</div>;

const baseUrl = `/ridge`; // for gh-pages

const App = (_) => (
  <Router>
    <div style={{ marginBottom: "2rem" }}>
      <MainMenu />
      <main style={{ padding: "1rem 0" }}>
        <Route path={`${baseUrl}/employees`} component={Employees} />
        <Route path={`${baseUrl}/tasks`} component={Tasks} />
        <Route path={`${baseUrl}/column`} component={Column} />
        <Route path={`${baseUrl}/histogram`} component={Histogram} />
        <Route path={`${baseUrl}/timegraph`} component={Timegraph} />
        <Route
          path={`${baseUrl}/lesson-turnaround`}
          component={SummaryTurnaround}
        />
        <Route
          path={`${baseUrl}/material-requests`}
          component={MaterialRequests}
        />
        <Route path={`${baseUrl}/referrals`} component={Referrals} />
        <Route path={`${baseUrl}/projections`} component={Projections} />
        <Route exact path={baseUrl} component={Projections} />
        <Route exact path="/" component={Projections} />
      </main>
    </div>
  </Router>
);

export default App;
