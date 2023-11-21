import axios from "axios";

export const api = axios.create({
    baseURL: process.env.REACT_APP_API
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    return config;
});

export const enviarPixPorChave = async (request) => {
    try {
        await api.post("/movimento/transacaoPixViaChave", request);
    } catch (error) {
        debugger
        throw error.response.data;
    }
}