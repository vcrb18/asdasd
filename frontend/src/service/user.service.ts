import axios, { type AxiosResponse } from "axios";

const API_URL = "http://localhost:8080/";

// ASI LLAMO A MIS RUTAS PROTEGIDAS
// POR EJEMPLO EXAMENES, EXAMEN, ALERTAS.
export const getPublicContent = async (): Promise<AxiosResponse> => {
  return await axios.get(API_URL + "landingPage");
};

// export const getUsers = async (): Promise<AxiosResponse> => {
// return await axios.get(API_URL + "users", { headers: authHeader() });
// };

// export const getPatients = async (): Promise<AxiosResponse> => {
// return await axios.get(API_URL + "patients", { headers: authHeader() });
// };

// export const getAdminBoard = async (): Promise<AxiosResponse> => {
// return await axios.get(API_URL + "admin", { headers: authHeader() });
// };
