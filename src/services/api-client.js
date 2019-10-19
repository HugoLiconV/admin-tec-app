import axios from "axios";
import { AUTH_TOKEN } from "../constants";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
  async config => {
    const token = await window.localStorage.getItem(AUTH_TOKEN);
    console.log("TCL: token", token)
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

function client(endpoint, { method = "get", data, options } = {}) {
  console.log("TCL: client -> method", method)
  console.log("TCL: client -> data", data)
  return axios[method](endpoint, data, options);
}

export default client;