import axios, { type AxiosResponse } from "axios";

const API_URL = "http://localhost:8080/";

interface LoginResponse {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: any;
}

export const register = async (
  username: string,
  email: string,
  password: string
): Promise<AxiosResponse> => {
  return await axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

export const login = async (email: string, password: string): Promise<LoginResponse>  => {
  try {
    const response = await axios.post(API_URL + "login", {
      email,
      password,
    });

    console.log("Estamos en la response del login");
    console.log("response");
    console.log(response);
    console.log("response.data");
    console.log(response.data);
    console.log("response.data.token");
    console.log(response.data.token);

    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
      console.log("Entro en el if: if (response.data.token)");
      const userIsLogged = getCurrentUser();
      console.log("userIsLogged");
      console.log(userIsLogged);
    }

    return response.data;
  } catch (error) {
    console.log("Error in login request:", error);
    throw error;
  }
};

export const logout = (): void => {
  console.log("ENTRAMOS al logout");
  localStorage.removeItem("user");
  const userIsLogged = getCurrentUser();
  console.log("userIsLogged");
  console.log(userIsLogged);
};

export const getCurrentUser = (): any => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);

  return null;
};
