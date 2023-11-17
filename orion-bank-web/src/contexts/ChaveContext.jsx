import React, { createContext, useContext } from "react";
import { showErrorNotification, showSuccessNotification } from '../shared/notificationUtils';
import { criarChave, obterChavesPorConta, inativarChave } from "../services/chaveApi";
import { AuthContext } from "./AuthContext";


export const ChaveContext = createContext();

export function ChaveProvider({ children }) {
    const { user } = useContext(AuthContext);

    const criarChavePix = async (request) => {
        try {

            request.codigoConta = user.codigo;
            await criarChave(request);
            showSuccessNotification("Chave cadastrada com sucesso!")
        } catch (error) {

            showErrorNotification(error.message);
        }
    };

    const obterChavesPix = async () => {
        try {
            return await obterChavesPorConta(user.codigo); 
        } catch (   error) {
            showErrorNotification(error.response.data);
        }
    };

    const inativarChavePix = async (codigoChave) => {
        try {
            await inativarChave(codigoChave);
        } catch (error) {
            showErrorNotification(error.response.data);
        }
    };

    return (
        <ChaveContext.Provider value={{ user, criarChavePix, obterChavesPix, inativarChavePix }}>
            {children}
        </ChaveContext.Provider>
    );
}

export function useChave() {
    return useContext(ChaveContext);
}