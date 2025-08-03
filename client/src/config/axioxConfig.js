import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9191/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const auth = JSON.parse(sessionStorage.getItem("auth"));
    if (auth?.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
