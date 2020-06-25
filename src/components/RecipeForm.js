import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
// import * as yup from "yup";
import axiosWithAuth from "../utils/axiosWithAuth";
import RecipeContext from "../contexts/RecipeContext";

function RecipeForm(props) {
  const editData = props.location.state;
  const history = useHistory();
  const { isEditing, setIsEditing, user } = useContext(RecipeContext);
  const initialState = {
    title: "",
    creator: user.username,
    ingredients: "",
    directions: "",
    category: "",
    user_id: user.id,
  };
  const [recipe, setRecipe] = useState(editData || initialState);

  // const [errors, setErrors] = useState(initialState);

  // const formSchema = yup.object().shape({

  // });

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post(`/api/recipes/${user.id}/user`, recipe)
      .then((res) => {
        // console.log(res);
        setRecipe(initialState);
        history.push("/");
      })
      .catch((error) => console.log("new recipe Error", error.config.data, { error }));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/api/recipes/${editData.id}`, recipe)
      .then((res) => {
        // console.log("edit response", res);
        console.log("Done Editing");
        setIsEditing(false);
        history.push("/");
      })
      .catch((err) => console.log("edit error", err));
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
      <form onSubmit={isEditing ? handleEdit : handleSubmit}>
        <label htmlFor="title">
          Title:
          <br />
          <input id="title" type="text" name="title" onChange={handleChange} value={recipe.title} />
        </label>
        <label htmlFor="ingredients">
          Ingredients
          <textarea
            name="ingredients"
            rows="5"
            cols="50"
            maxLength="10000"
            onChange={handleChange}
            value={recipe.ingredients}></textarea>
        </label>
        <label htmlFor="directions">
          Directions
          <textarea
            name="directions"
            rows="5"
            cols="50"
            maxLength="10000"
            onChange={handleChange}
            value={recipe.directions}></textarea>
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
