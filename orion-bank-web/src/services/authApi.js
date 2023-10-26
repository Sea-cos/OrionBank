import axios from "axios";

export const api = axios.create({
    baseURL: process.env.REACT_APP_API
});

export const autenticarUsuario = async (email, password) => {
    return api.post("/autenticacao", { email, password})
}