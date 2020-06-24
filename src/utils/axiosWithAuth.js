import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("RecipeToken");

  return axios.create({
    baseURL: "https://backend-secretfamilyrecipe.herokuapp.com",
    headers: {
      authorization: token,
    },
  });
};
export default axiosWithAuth;
