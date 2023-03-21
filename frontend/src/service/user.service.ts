import axios, { type AxiosResponse } from "axios";
import authHeader from "./auth.header";
const API_URL = "http://localhost:8080/";

// ASI LLAMO A MIS RUTAS PROTEGIDAS
// POR EJEMPLO EXAMENES, EXAMEN, ALERTAS.
export const getPublicContent = async (): Promise<AxiosResponse> => {
  return await axios.get(API_URL + "landingPage");
};

export const getExams = async (): Promise<AxiosResponse> => {
  return await axios.get(API_URL + "exams", { headers: authHeader() });
};

// export const getPatients = async (): Promise<AxiosResponse> => {
// return await axios.get(API_URL + "patients", { headers: authHeader() });
// };

// export const getAdminBoard = async (): Promise<AxiosResponse> => {
// return await axios.get(API_URL + "admin", { headers: authHeader() });
// };
