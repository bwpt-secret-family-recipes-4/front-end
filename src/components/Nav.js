import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <div className="container">
        <div>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
          <NavLink exact to="/">
            Recipes
          </NavLink>
        </div>
        {/* <div className="searchbox">
          <label htmlFor="search">
            Search
            <input type="text" name="search" id="search" placeholder="search" />
          </label>
        </div> */}
      </div>
    </nav>
  );
};

export default Nav;
