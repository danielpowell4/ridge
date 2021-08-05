import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
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
  ScoreReport,
} from "./components";

import "./App.css";

const App = (_) => (
  <Router>
    <div style={{ marginBottom: "2rem" }}>
      <MainMenu />
      <main style={{ padding: "1rem 0" }}>
        <Route path={`/employees`} component={Employees} />
        <Route path={`/tasks`} component={Tasks} />
        <Route path={`/column`} component={Column} />
        <Route path={`/histogram`} component={Histogram} />
        <Route path={`/timegraph`} component={Timegraph} />
        <Route path={`/lesson-turnaround`} component={SummaryTurnaround} />
        <Route path={`/material-requests`} component={MaterialRequests} />
        <Route path={`/referrals`} component={Referrals} />

        <Route path={`/projections`} component={Projections} />
        <Route path={`/score-report`} component={ScoreReport} />
        <Route exact path="/" component={Projections} />
      </main>
    </div>
  </Router>
);

export default App;
