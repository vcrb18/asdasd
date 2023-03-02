import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/";

// ASI LLAMO A MIS RUTAS PROTEGIDAS
// POR EJEMPLO EXAMENES, EXAMEN, ALERTAS.
export const getPublicContent = async () => {
  return await axios.get(API_URL + "all");
};

export const getUserBoard = async () => {
  return await axios.get(API_URL + "user", { headers: authHeader() });
};

export const getModeratorBoard = async () => {
  return await axios.get(API_URL + "mod", { headers: authHeader() });
};

export const getAdminBoard = async () => {
  return await axios.get(API_URL + "admin", { headers: authHeader() });
};
