import axios from 'axios';

export const apiUrl = "https://d3a3-187-21-12-132.ngrok-free.app/";

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