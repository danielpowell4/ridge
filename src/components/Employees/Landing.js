import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import EmployeeHoursChart from "./EmployeeHoursChart";
import { Widget } from "../shared";

const Landing = ({ match }) => (
  <div>
    <h2>Employees</h2>
    <ul>
      <li>
        <Link to={`${match.url}/coach_quota_progress`}>
          Coach Quota Progress
        </Link>
      </li>
    </ul>
    <Switch>
      <Route
        exact
        path={`${match.url}/coach_quota_progress`}
        component={EmployeeHoursChart}
      />
      <Route path={`${match.url}/:urlString`} component={Widget} />
      <Route
        exact
        path={match.url}
        render={() => <h3>Please select a graph.</h3>}
      />
    </Switch>
  </div>
);

export default Landing;
