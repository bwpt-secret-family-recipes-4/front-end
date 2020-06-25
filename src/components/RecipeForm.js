import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
// import * as yup from "yup";
import axiosWithAuth from "../utils/axiosWithAuth";
import RecipeContext from "../contexts/RecipeContext";

function RecipeForm() {
  const history = useHistory();
  const { user, setAllRecipes } = useContext(RecipeContext);
  const initialState = { title: "", creator: user, ingredients: "", directions: "", category: "" };
  const [recipe, setRecipe] = useState(initialState);

  // const [errors, setErrors] = useState(initialState);

  // const formSchema = yup.object().shape({

  // });

  const handleSubmit = (e, id) => {
    e.preventDefault();
    axiosWithAuth()
      .post(`/api/recipes/${id}/${user}`, recipe)
      .then((res) => {
        console.log(res.data);
        setAllRecipes([...res.data]); //! what shape is the data returned
        setRecipe(initialState);
        history.push("/");
      })
      .catch((error) => console.log("Error", error));
  };

  const handleChange = (e) => {
    // console.log("Input Changed:", e.target.value);
    // console.log("Input that fired event:", e.target.name);

    const newRecipe = {
      ...recipe,
      [e.target.name]: e.target.value,
    };
    setRecipe(newRecipe);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          Title:
          <input id="title" type="text" name="title" onChange={handleChange} value={recipe.title} />
        </label>
        <label htmlFor="creator">
          Creator:
          <input
            id="creator"
            type="text"
            name="creator"
            onChange={handleChange}
            value={recipe.user}
          />
        </label>
        <label htmlFor="ingredients">
          Ingedients
          <textarea name="ingredients" rows="5" cols="50" maxlength="10000"></textarea>
        </label>
        <label htmlFor="directions">
          Directions
          <textarea name="directions" rows="5" cols="50" maxlength="10000"></textarea>
        </label>
        <label htmlFor="category">
          Category - Breakfast, Lunch, Dinner, Dessert, etc.
          <input
            id="category"
            type="text"
            name="category"
            onChange={handleChange}
            value={recipe.category}
          />
        </label>
        <br />
        <br />
        <button type="submit">Submit</button>
        {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
      </form>
    </div>
  );
}

export default RecipeForm;
