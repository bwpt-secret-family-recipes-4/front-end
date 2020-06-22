import React, { useContext } from "react";
import RecipeContext from "../contexts/RecipeContext";

function SignUp() {
  const { handleSignupSubmit } = useContext(RecipeContext);

  return <h1>Sign Up"</h1>;
}

export default SignUp;
