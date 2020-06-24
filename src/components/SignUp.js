import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

function SignUp() {
const [post, setPost] = useState({});
const initialState = { fullName: "", userName: "", password: "", email: "" };
const [user, setUser] = useState(initialState);

const [errors, setErrors] = useState(initialState);

const formSchema = yup.object().shape({
    fullName: yup.string(),
    userName: yup.string().required("User name is a required field."),
    password: yup.string().required("Password is required."),
    email: yup.string()
});

useEffect(() => {
    console.log("Checking form validity.");
    formSchema.isValid(user).then(isFormValid => {
      console.log("Is form valid?", isFormValid);
    });
  }, [user]);

  const handleSubmit = e => {
    e.preventDefault();
    axios
    .post("https://reqres.in/api/users", user)
    .then(res => {
        setPost(res.data);
        setUser(initialState);
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

    const newUser = {
        ...user, [e.target.name]: e.target.value
    };
    validateChange(e);
    setUser(newUser);
};

    return (
        <form onSubmit={handleSubmit}>
         <label htmlFor="fullName">
             Full Name:{"  "}
            <input
            id="fullName"
            type="text"
            name="fullName"
            onChange={handleChange}
            value={user.fullName}
            data-cy="fullname"
            />
            {errors.fullName.length > 0 ? <p className="error">{errors.fullName}</p> : null}
        </label>
        <label htmlFor="userName">
            Username:{"  "}
          <input
            id="userName"
            type="text"
            name="userName"
            onChange={handleChange}
            value={user.userName}
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
            value={user.password}
            data-cy="password"
            />
             {errors.password.length > 0 ? <p className="error">{errors.password}</p> : null}
        </label>
        <label htmlFor="email">
            Email:{"  "}
            <input
            id="email"
            type="email"
            name="email"
            onChange={handleChange}
            value={user.email}
            dat-cy="email"
            />
             {errors.email.length > 0 ? ( <p className="error">{errors.email}</p> ) : null}
        </label>
        <br /><br />
        <button type="submit" data-cy="submit">
          Submit
        </button>
        {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
      </form>
    )
}

export default SignUp;
