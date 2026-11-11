

import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-mu-eight-7zlk1nae8d.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

// Har protected request ke sath token bhejo
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // console.log("Token:", token ? "Found" : "Not Found");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
