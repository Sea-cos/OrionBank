import axios from "axios";

export const api = axios.create({
    baseURL: process.env.REACT_APP_API
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    return config;
});

export const criarChave = async (request) => {
    try {
        await api.post("/chavePix/criar", request);
    } catch (error) {
        throw error;
    }
}