import React from "react";
import { Link } from "react-router-dom";

const Menu = _ => (
  <div className="menu-container">
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/employees">Employees</Link>
      </li>
      <li>
        <Link to="/tasks">Tasks</Link>
      </li>
      <li>
        <Link to="/column">Column</Link>
      </li>
      <li>
        <Link to="/histogram">Histogram</Link>
      </li>
      <li>
        <Link to="/timegraph">Timegraph</Link>
      </li>
      <li>
        <Link to="/material-requests">Material Requests</Link>
      </li>
      <li>
        <Link to="/referrals">Client Referrals</Link>
      </li>
    </ul>
  </div>
);

export default Menu;
