import React from "react";
import { Link } from "react-router-dom";

const Menu = _ => (
  <div class="menu-container">
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/employees">Employees</Link>
      </li>
    </ul>
  </div>
);

export default Menu;
