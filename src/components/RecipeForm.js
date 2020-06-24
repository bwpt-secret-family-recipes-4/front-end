import React, { useState, useContext } from "react";
// import * as yup from "yup";
import axios from "axios";
import RecipeContext from "../contexts/RecipeContext";

function RecipeForm() {
    const { handleAddRecipeSubmit, handleEditRecipeSubmit, deleteRecipe } = useContext(RecipeContext);
    const [post,setPost] = useState({});
    const initialState = {};
    const [recipe, setRecipe] = useState(initialState);

    // const [errors, setErrors] = useState(initialState);

    // const formSchema = yup.object().shape({

    // });

    const handleSubmit = e => {
        e.preventDefault();
        axios
        .post("https://reqres.in/api/users", recipe)
        .then(res => {
            setPost(res.data);
            setRecipe(initialState);
    ;        })
        .catch(error => console.log("Error", error));
    };

    const handleChange = e => {
        console.log("Input Changed:", e.target.value);
        console.log("Input that fired event:", e.target.name);

        const newRecipe = {
            ...recipe, [e.target.name]: e.target.value
        };
        setRecipe(newRecipe);
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">
                    Title:{"  "}
                    <input
                    id="title"
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={recipe.title}
                    />
                </label>
                <label htmlFor="creator">
                    Creator:{"  "}
                    <input
                    id="creator"
                    type="text"
                    name="creator"
                    onChange={handleChange}
                    value={}
                    />
                </label>
                <label htmlFor="ingredients">
                Ingedients
                <textarea name="ingredients"
                    rows="5" cols="50"
                    maxlength="10000">
                </textarea>
                </label>
                <label htmlFor="instructions">
                Instructions
                <textarea name="instructions"
                    rows="5" cols="50"
                    maxlength="10000">
                </textarea>
                </label>
                <label htmlFor="category">
                    Category - Breakfast, Lunch,
                    Dinner, Dessert, etc.{"  "}{"  "}
                    <input
                    id="category"
                    type="text"
                    name="category"
                    onChange={handleChange}
                    value={}
                    />
                </label>
                <br /><br />
                <button type="submit">
                    Submit
                </button>
                {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
            </form>
        </div>
    )
}

export default RecipeForm;
