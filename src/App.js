import React, { useState, useEffect } from "react";
import { useHistory, Switch, Route, Redirect } from "react-router-dom";
// import axios from "axios";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Navigation from "./components/Navigation";

import axiosWithAuth from "./utils/axiosWithAuth";
import RecipeContext from "./contexts/RecipeContext";

import Card from "./components/Card";

function App() {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allRecipes, setAllRecipes] = useState([
    {
      id: 0,
      title: "Example Recipe",
      creator: "Creators Username",
      ingredients: ["First Ingredient", "Second Ingredient", "Third Ingredient"],
      directions:
        "Follow the instructions to make delicious food that you can do yourself that is easy and tasty",
      category: "test",
    },
  ]);

  // const handleSignupSubmit = (e, data) => {
  //   e.preventDefault();
  //   axios
  //     .post("/api/auth/register", data)
  //     .then((res) => {
  //       console.log(res.data);
  //       localStorage.setItem("RecipeToken", res.data.payload); //! maybe?? is a token given back on signup??
  //       history.push("/");
  //     })
  //     .catch((err) => console.log(err));
  // };
  // const handleLoginSubmit = (e, data) => {
  //   e.preventDefault();
  //   axiosWithAuth()
  //     .post("/api/auth/login", data)
  //     .then((res) => {
  //       console.log(res.data);
  //       localStorage.setItem("RecipeToken", res.data.payload);
  //       setIsLoggedIn(true);
  //       history.push("/");
  //     })
  //     .catch((err) => console.log(err));
  // };
  // const handleAddRecipeSubmit = (e, data) => {
  //   e.preventDefault();
  //   axiosWithAuth()
  //     .post(`/api/recipes/:id/user`, data)
  //     .then((res) => {
  //       console.log(res.data);
  //       setAllRecipes([...allRecipes, res.data]); //! what shape is the data returned
  //       history.push("/");
  //     })
  //     .catch((err) => console.log(err));
  // };
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
        console.log(res.data);
        setAllRecipes([...allRecipes, res.data]); //! what shape is the data returned
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  useEffect(
    () => {
      if (localStorage.getItem("RecipeToken")) {
        axiosWithAuth()
          .get("/api/recipes")
          .then((res) => {
            console.log(res);
            // setAllRecipes(res.data);
            // setIsLoggedIn(true);
            // history.push("/"); //! might not need to do this line, only needed if page refresh is required
          })
          .catch((err) => console.log(err));
      }
    },
    // eslint-disable-next-line
    []
  );

  return (
    <RecipeContext.Provider
      value={{
        setAllRecipes,
        deleteRecipe,
        setIsLoggedIn,
      }}>
      <div className="App">
        <Navigation />

        <Switch>
          <Route exact path="/">
            {isLoggedIn ? (
              allRecipes.map((item) => {
                return <Card key={item.id} {...item} />;
              })
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/login" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </div>
    </RecipeContext.Provider>
  );
}

export default App;
