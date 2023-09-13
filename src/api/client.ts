import axios from 'axios';

import { TokenStore } from '@/ts/types/authContext';

const baseURL = 'http://localhost:8080';
const client = axios.create({ baseURL });

export const setClientToken = (store: TokenStore) => {
  const token = store.get();
  client.defaults.headers.get['x-access-token'] = token;
};

export const removeClientToken = () => {
  client.defaults.headers.get['x-access-token'] = null;
};

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.data?.name) return Promise.reject(error?.response?.data?.name);
    return Promise.reject(error);
  },
);

export default client;
