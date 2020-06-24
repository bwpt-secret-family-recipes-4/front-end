import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <div className="container">
        <div>
          <NavLink to="/login">Log In</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
          <NavLink exact to="/">
            Recipes
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
