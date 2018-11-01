import React from "react";
import { NavLink } from "react-router-dom";

const Menu = _ => (
  <nav
    style={{
      padding: ".85rem 1.5rem",
      boxShadow: "0 1px 1px rgba(0,0,0,.15)",
      backgroundColor: "#fff",
      display: "flex",
      alignItems: "center"
    }}
  >
    <NavLink activeClassName="active" to="/material-requests">
      Material Requests
    </NavLink>
    <NavLink activeClassName="active" to="/referrals">
      Client Referrals
    </NavLink>
    <NavLink activeClassName="active" to="/lesson-turnaround">
      Lesson Turnaround
    </NavLink>
    <NavLink activeClassName="active" to="/tasks">
      Tasks
    </NavLink>
    <NavLink activeClassName="active" to="/histogram">
      Histogram
    </NavLink>
  </nav>
);

export default Menu;
