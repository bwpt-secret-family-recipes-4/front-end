import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import axiosWithAuth from "../utils/axiosWithAuth";
import RecipeContext from "../contexts/RecipeContext";

function RecipeForm() {
  const history = useHistory();
  const { user, setAllRecipes } = useContext(RecipeContext);
  const initialState = { title: "", creator: user, ingredients: "", directions: "", category: "" };
  const [recipe, setRecipe] = useState(initialState);

  const [errors, setErrors] = useState(initialState);

  const formSchema = yup.object().shape({
    title: yup.string().required("Title is required."),
    ingredients: yup.string().required("Ingredients are required."),
    directions: yup.string().required("Directions are required."),
    category: yup.string().required("Category is required")
  });

  useEffect(() => {
    formSchema.isValid(recipe).then((isFormValid) => {

    }, [recipe, formSchema])
  })

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

  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((inputIsValid) => {
        console.log("Input is validateChange.");
        setErrors({ ...errors, [e.target.name]: ""});
      })
      .catch((error) => {
        console.log("There is an error.");
        setErrors({ ...errors, [e.target.name]: error.errors[0] });
        console.log(errors);
      });
  };

  const handleChange = (e) => {
    e.persist();
    console.log("Input Changed:", e.target.value);
    console.log("Input that fired event:", e.target.name);

    const newRecipe = {
      ...recipe,
      [e.target.name]: e.target.value,
    };
    validateChange(e);
    setRecipe(newRecipe);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          Title:
          <input id="title"
          type="text"
          name="title"
          onChange={handleChange}
          value={recipe.title}
          />
          {errors.title.length > 0 ? <span className="error">{errors.title}</span> : null}
        </label>
        <label htmlFor="ingredients">
          Ingedients
          <textarea name="ingredients" rows="5" cols="50" maxLength="10000" onChange={handleChange} value= {recipe.ingredients}></textarea>
          {errors.ingredients.length > 0 ? <span className="error">{errors.ingredients}</span> : null}
        </label>
        <label htmlFor="directions">
          Directions
          <textarea name="directions" rows="5" cols="50" maxLength="10000" onChange={handleChange} value={recipe.directions}></textarea>
          {errors.directions.length > 0 ? <span className="error">{errors.directions}</span> : null}
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
          {errors.category.length > 0 ? <span className="error">{errors.category}</span> : null}
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
