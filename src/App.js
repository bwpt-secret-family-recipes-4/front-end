import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import axios from "axios";

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Navigation from "./components/Navigation";

import axiosWithAuth from "./utils/axiosWithAuth";
import RecipeContext from "./contexts/RecipeContext";

import Nav from "./components/Nav";
import Card from "./components/Card";

function App() {
  const history = useHistory();
  const [allRecipes, setAllRecipes] = useState([
    {
      id: 0,
      name: "Example Recipe",
      creator: "Creators Username",
      ingredients: ["First Ingredient", "Second Ingredient", "Third Ingredient"],
      instructions: "Follow the instructions to make delicious food",
    },
  ]);

  const handleSignupSubmit = (e, data) => {
    e.preventDefault();
    axios
      .post("signup endpoint", data)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("RecipeToken", res.data.payload); //! maybe?? is a token given back on signup??
        history.push("/");
      })
      .catch((err) => console.log(err));
  };
  const handleLoginSubmit = (e, data) => {
    e.preventDefault();
    axiosWithAuth()
      .post("login endpoint", data)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("RecipeToken", res.data.payload);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };
  const handleAddRecipeSubmit = (e, data) => {
    e.preventDefault();
    axiosWithAuth()
      .post("add recipe endpoint", data)
      .then((res) => {
        console.log(res.data);
        setAllRecipes([...allRecipes, res.data]); //! what shape is the data returned
        history.push("/");
      })
      .catch((err) => console.log(err));
  };
  const handleEditRecipeSubmit = (e, data) => {
    e.preventDefault();
    axiosWithAuth()
      .put("edit recipe endpoint", data)
      .then((res) => {
        console.log(res.data);
        setAllRecipes([...allRecipes, res.data]); //! what shape is the data returned
        history.push("/");
      })
      .catch((err) => console.log(err));
  };
  const deleteRecipe = (id) => {
    axiosWithAuth()
      .delete(`delete endpoint/${id}`)
      .then((res) => {
        console.log(res.data);
        setAllRecipes([...allRecipes, res.data]); //! what shape is the data returned
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  useEffect(
    () => {
      axiosWithAuth()
        .get("the recipes from backend")
        .then((res) => {
          console.log(res);
          setAllRecipes(res.data);
          history.push("/"); //! might not need to do this line, only needed if page refresh is required
        })
        .catch((err) => console.log(err));
    },
    // eslint-disable-next-line
    []
  );

  return (
    <div>
      <Switch>
        <Route path="/signin" component = {SignIn} />
        <Route path="/signup" component = {SignUp} />
        <Route path="/" component = {SignIn} />
      </Switch>
      <Navigation />

    <RecipeContext.Provider
      value={{
        setAllRecipes,
        handleSignupSubmit,
        handleLoginSubmit,
        handleAddRecipeSubmit,
        handleEditRecipeSubmit,
        deleteRecipe,
      }}>
      <div className="App">
        <Nav />
        {allRecipes.map((item) => {
          return <Card key={item.id} {...item} />;
        })}
      </div>
    </RecipeContext.Provider>

    </div>
  );
}

export default App;
