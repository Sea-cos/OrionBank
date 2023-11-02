import axios from "axios";

export const api = axios.create({
    baseURL: process.env.REACT_APP_API
});

export const solicitarConta = async (solicitacao) => {
    try {
        const response = await api.post("/abrirConta/solicitacao", solicitacao);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}