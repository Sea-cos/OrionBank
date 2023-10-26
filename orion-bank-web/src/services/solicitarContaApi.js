import axios from "axios";

export const api = axios.create({
    baseURL: process.env.REACT_APP_API
});

export const solicitarConta = async (solicitacao) => {
    return api.post("/abrirConta/solicitacao", { solicitacao })
}