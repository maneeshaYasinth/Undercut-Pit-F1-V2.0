import axios from "axios";
import { getToken } from "./authService";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
