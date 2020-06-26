import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Navigation from "./components/Navigation";

import RecipeContext from "./contexts/RecipeContext";

import PrivateRoute from "./components/PrivateRoute";
import RecipesList from "./components/RecipesList";
import RecipeForm from "./components/RecipeForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("RecipeToken") ? true : false);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState("");
  const [allRecipes, setAllRecipes] = useState([
    {
      id: 0,
      title: "Example Recipe",
      creator: "Creators Username",
      ingredients: "First Ingredient, Second Ingredient, Third Ingredient",
      directions:
        "Follow the instructions to make delicious food that you can do yourself that is easy and tasty",
      category: "test",
    },
  ]);

  return (
    <RecipeContext.Provider
      value={{
        user,
        setUser,
        allRecipes,
        setAllRecipes,
        isEditing,
        setIsEditing,
        isLoggedIn,
        setIsLoggedIn,
      }}>
      <div className="App">
        <Navigation />

        <Switch>
          <PrivateRoute exact path="/" component={RecipesList} />
          <Route path="/login" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute path="/add" component={RecipeForm} />
          <PrivateRoute path="/edit" component={RecipeForm} />
        </Switch>
      </div>
    </RecipeContext.Provider>
  );
}

export default App;
