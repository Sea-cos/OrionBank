import axios from "axios";

export const api = axios.create({
    baseURL: process.env.REACT_APP_API
});

export const enviarEmail = async (documento) => {
    try {
        const response = await api.post("/enviarEmail", documento);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const alterarSenha = async (request) => {
    try {
        const response = await api.post("/alterarSenha", request);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}