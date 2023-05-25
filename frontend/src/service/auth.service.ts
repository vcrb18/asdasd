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

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await axios.post("/login", {
      email,
      password,
    });

    // CAMBIAR
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
      const userIsLogged = getCurrentUser();
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

// CAMBIAR
export const logout = async () => {
  localStorage.removeItem("user");
  const userIsLogged = getCurrentUser();
};

export const getCurrentUser = (): any => {
  // CAMBIAR
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);

  return null;
};
