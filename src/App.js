import React, { useState, useEffect } from "react";

import RecipeContext from "./contexts/RecipeContext";
import Card from "./components/Card";
import axiosWithAuth from "./utils/axiosWithAuth";

function App() {
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("the recipes from backend")
      .then((res) => {
        console.log(res);
        setAllRecipes(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <RecipeContext.Provider value={{}}>
      <div className="App">
        {allRecipes.map((item) => {
          return <Card {...item} />;
        })}
      </div>
    </RecipeContext.Provider>
  );
}

export default App;
