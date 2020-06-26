import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("RecipeToken");

  return axios.create({
    baseURL: "https://secretfamilyrecipes.herokuapp.com",
    headers: {
      authorization: token,
    },
  });
};
export default axiosWithAuth;
