import axios from 'axios';

export const apiUrl = "http://127.0.0.1:8000/";

export const api = axios.create({
  baseURL: apiUrl,
  timeout: 5000,
});

export default api;

/* POssivel Envio do token
import { parseCookies } from 'nookies';
const { token } = parseCookies();
if (token) {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
}
*/