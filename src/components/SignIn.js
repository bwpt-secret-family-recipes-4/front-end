import React, { useState, useEffect, useContext } from "react";
import * as yup from "yup";
// import axios from "axios";

import axiosWithAuth from "../utils/axiosWithAuth";
import RecipeContext from "../contexts/RecipeContext";

function SignIn() {
  // console.log("Sign In: ", props);
  const { setIsLoggedIn } = useContext(RecipeContext);
  const initialState = { userName: "", password: "" };
  const [logInUser, setLogInUser] = useState(initialState);

  const [errors, setErrors] = useState({ userName: "", password: "" });

  const formSchema = yup.object().shape({
    userName: yup.string().required("User name is required."),
    password: yup.string().required("Password is required."),
  });

  useEffect(() => {
    console.log("Checking form validity.");
    formSchema.isValid(logInUser).then((isFormValid) => {
      console.log("Is form valid?", isFormValid);
    });
  }, [logInUser, formSchema]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/auth/login", logInUser)
      .then((res) => {
        console.log(res);
        localStorage.setItem("RecipeToken", "");
        setIsLoggedIn();
        setLogInUser(initialState);
      })
      .catch((error) => console.log("Error", error));
  };

  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((inputIsValid) => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch((error) => {
        setErrors({ ...errors, [e.target.name]: error.errors[0] });
      });
  };

  const handleChange = (e) => {
    e.persist();
    console.log("Input Changed:", e.target.value);
    console.log("Input that fired event:", e.target.name);

    const newLogInUser = {
      ...logInUser,
      [e.target.name]: e.target.value,
    };
    validateChange(e);
    setLogInUser(newLogInUser);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="userName">
        Username:{"  "}
        <input
          id="userName"
          type="text"
          name="userName"
          onChange={handleChange}
          value={logInUser.username}
          data-cy="username"
        />
        {errors.userName.length > 0 ? <span className="error">{errors.userName}</span> : null}
      </label>
      <label htmlFor="password">
        Password:{"  "}
        <input
          id="password"
          type="password"
          name="password"
          onChange={handleChange}
          value={logInUser.password}
          data-cy=""
        />
        {errors.password.length > 0 ? <p className="error">{errors.password}</p> : null}
      </label>
      <button type="submit" data-cy="submit">
        Submit
      </button>
      {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
    </form>
  );
}

export default SignIn;
