import React from "react";

const Nav = () => {
  return (
    <nav>
      <div className="container">
        <div>
          <button>Login</button>
          <button>Recipes</button>
        </div>
        <div className="searchbox">
          <label htmlFor="search">
            Search
            <input type="text" name="search" id="search" placeholder="search" />
          </label>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
