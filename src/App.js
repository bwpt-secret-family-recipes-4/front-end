import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Navigation from "./components/Navigation";

import axiosWithAuth from "./utils/axiosWithAuth";
import RecipeContext from "./contexts/RecipeContext";

import PrivateRoute from "./components/PrivateRoute";
import RecipesList from "./components/RecipesList";
import RecipeForm from "./components/RecipeForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("RecipeToken") ? true : false);
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

  // const handleEditRecipeSubmit = (e, data) => {
  //   e.preventDefault();
  //   axiosWithAuth()
  //     .put("/api/recipes/:id", data)
  //     .then((res) => {
  //       console.log(res.data);
  //       setAllRecipes([...allRecipes, res.data]); //! what shape is the data returned
  //       history.push("/");
  //     })
  //     .catch((err) => console.log(err));
  // };
  const deleteRecipe = (id) => {
    axiosWithAuth()
      .delete(`/api/recipes/${id}`)
      .then((res) => {
        console.log("delete response", res.data);
        const afterDelete = allRecipes.filter((item) => item.id !== id);
        setAllRecipes([...afterDelete]);
      })
      .catch((err) => console.log("delete error", err));
  };

  return (
    <RecipeContext.Provider
      value={{
        user,
        setUser,
        allRecipes,
        setAllRecipes,
        deleteRecipe,
        isLoggedIn,
        setIsLoggedIn,
      }}>
      <div className="App">
        <Navigation />

        <Switch>
          <PrivateRoute exact path="/" component={RecipesList} />
          <Route path="/login" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/add" component={RecipeForm} />
        </Switch>
      </div>
    </RecipeContext.Provider>
  );
}

export default App;
