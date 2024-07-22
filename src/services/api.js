import axios from 'axios';
import { getToken } from "./auth";

export const apiUrl = "http://127.0.0.1:8000/";

export const api = axios.create({
  baseURL: apiUrl,
  timeout: 5000,
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default api;

/* POssivel Envio do token
import { parseCookies } from 'nookies';
const { token } = parseCookies();
if (token) {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
}
*/