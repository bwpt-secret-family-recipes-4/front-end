import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import RecipeContext from "../contexts/RecipeContext";

const Navigation = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(RecipeContext);

  const logOut = () => {
    localStorage.removeItem("RecipeToken");
    localStorage.removeItem("RecipeUser");
    setIsLoggedIn(false);
  };
  return (
    <nav>
      <div className="container">
        <div>
          {isLoggedIn ? (
            <NavLink to="/login" onClick={logOut}>
              Log Out
            </NavLink>
          ) : (
            <>
              <NavLink to="/login">Log In</NavLink>
              <NavLink to="/signup">Sign Up</NavLink>
            </>
          )}
          <NavLink exact to="/">
            Recipes
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
