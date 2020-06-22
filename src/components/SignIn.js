import React, { useContext } from "react";
import RecipeContext from "../contexts/RecipeContext";

function SignIn() {
  const { handleLoginSubmit } = useContext(RecipeContext);

  return <h1>Sign In"</h1>;
}

export default SignIn;
