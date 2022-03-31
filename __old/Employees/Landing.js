import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import EmployeeHoursChart from "./EmployeeHoursChart";
import Utilization from "./Utilization";

const Landing = ({ match }) => (
  <div style={{ padding: 10, maxWidth: 900, width: "100%", margin: "auto" }}>
    <h2>Employees</h2>
    <ul>
      <li>
        <Link to={`${match.url}/coach_quota_progress`}>
          Coach Quota Progress
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/utilization`}>Utilization</Link>
      </li>
    </ul>
    <Switch>
      <Route
        exact
        path={`${match.url}/coach_quota_progress`}
        component={EmployeeHoursChart}
      />
      <Route path={`${match.url}/utilization`} component={Utilization} />
      <Route
        exact
        path={match.url}
        render={() => <h3>Please select a graph.</h3>}
      />
    </Switch>
  </div>
);

export default Landing;
