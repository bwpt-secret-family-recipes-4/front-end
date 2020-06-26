import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
// import axios from "axios";
import axiosWithAuth from "../utils/axiosWithAuth";

function SignUp() {
  const history = useHistory();
  const initialState = { name: "", username: "", password: "", email: "" };
  const [user, setUser] = useState(initialState);

  const [errors, setErrors] = useState(initialState);

  const formSchema = yup.object().shape({
    name: yup.string(),
    username: yup.string().required("User name is a required field."),
    password: yup.string().required("Password is required."),
    email: yup.string(),
  });
  
  useEffect(() => {
    // console.log("Checking form validity.");
    formSchema.isValid(user).then((isFormValid) => {
      // console.log("Is form valid?", isFormValid);
    });
  }, [user, formSchema]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);

    axiosWithAuth()
      .post("/api/auth/register", user)
      .then((res) => {
        console.log("sign up response", res.data);
        setUser(initialState);
        history.push("/");
      })
      .catch((error) => console.log("Register Error", error));
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
    // console.log("Input Changed:", e.target.value);
    // console.log("Input that fired event:", e.target.name);

    const newUser = {
      ...user,
      [e.target.name]: e.target.value,
    };
    validateChange(e);
    setUser(newUser);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Full Name:
        <input
          id="name"
          type="text"
          name="name"
          onChange={handleChange}
          value={user.name}
          data-cy="fullname"
        />
        {errors.name.length > 0 ? <span className="error">{errors.name}</span> : null}
      </label>
      <label htmlFor="username">
        Username:
        <input
          id="username"
          type="text"
          name="username"
          onChange={handleChange}
          value={user.userName}
          data-cy="username"
        />
        {errors.username.length > 0 ? <p className="error">{errors.username}</p> : null}
      </label>
      <label htmlFor="password">
        Password:
        <input
          id="password"
          type="password"
          name="password"
          onChange={handleChange}
          value={user.password}
          data-cy="password"
        />
        {errors.password.length > 0 ? <p className="error">{errors.password}</p> : null}
      </label>
      <label htmlFor="email">
        Email:
        <input
          id="email"
          type="email"
          name="email"
          onChange={handleChange}
          value={user.email}
          dat-cy="email"
        />
        {errors.email.length > 0 ? <p className="error">{errors.email}</p> : null}
      </label>
      <button type="submit" data-cy="submit">
        Sign Up
      </button>
      {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
    </form>
  );
}

export default SignUp;
