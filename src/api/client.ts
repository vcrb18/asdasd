import axios from "axios";

const baseURL = "http://localhost:8080";
const client = axios.create({ baseURL });

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.data?.name) return Promise.reject(error?.response?.data?.name);
    return Promise.reject(error);
  }
);


export default client;