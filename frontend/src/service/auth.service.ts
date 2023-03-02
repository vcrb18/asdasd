import { Login } from "@mui/icons-material";
import axios from "axios";

const API_URL = "http://localhost:8080/";

export const register = async (username: string, email: string, password: string) => {
  return await axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

export const login = async (email: string, password: string) => {
  return await axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      console.log("Estamos en la response del login");
      console.log("response");
      console.log(response);
      console.log("response.data");
      console.log(response.data);
      console.log("response.data.accessToken");
      console.log(response.data.accessToken);

      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log("Entro en el if: if (response.data.accessToken)");
        
      }

      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);

  return null;
};
