import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

function SignIn() {
  // console.log("Sign In: ", props);
const [post, setPost] = useState({});
const initialState = { userName: "", password: "" };
const [logInUser, setLogInUser] = useState(initialState);

const [errors, setErrors] = useState({ userName: "", password: "" });

const formSchema = yup.object().shape({
  userName: yup.string().required("User name is a required field."),
  password: yup.string().required("Password is required.")
});

useEffect(() => {
  console.log("Checking form validity.");
  formSchema.isValid(logInUser).then(isFormValid => {
    console.log("Is form valid?", isFormValid);
  });
}, [logInUser]);

const handleSubmit = e => {
  e.preventDefault();
  axios
  .post("https://reqres.in/api/users", logInUser)
  .then(res => {
      setPost(res.data);
      setLogInUser(initialState);
;        })
  .catch(error => console.log("Error", error));
};

const validateChange = e => {
  yup
  .reach(formSchema, e.target.name)
  .validate(e.target.value)
  .then(inputIsValid => {
      setErrors({ ...errors, [e.target.name]: ""
      });
  })
  .catch(error => { 
      setErrors({ ...errors, [e.target.name]: error.errors[0]
  });
});
};

const handleChange = e => {
  e.persist();
  console.log("Input Changed:", e.target.value);
  console.log("Input that fired event:", e.target.name);

  const newLogInUser = {
    ...logInUser, [e.target.name]: e.target.value
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
          {errors.userName.length > 0 ? <p className="error">{errors.userName}</p> : null}
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
      <br /><br />
        <button type="submit" data-cy="submit">
          Submit
        </button>
        {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
    </form>
  )
}

export default SignIn;
