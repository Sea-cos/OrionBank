import React, { createContext, useContext } from "react";
import { showErrorNotification } from '../shared/notificationUtils';
import { criarChave, obterChavesPorConta, consultarChave } from "../services/chaveApi";
import { AuthContext } from "./AuthContext";


export const ChaveContext = createContext();

export function ChaveProvider({ children }) {
    const { user } = useContext(AuthContext);

    const criarChavePix = async (request) => {
        try {
            await criarChave(request);
        } catch (error) {
            showErrorNotification(error.message);
        }
    };

    const obterChavesPix = async () => {
        try {
           return await obterChavesPorConta(user.codigo);
        } catch (error) {
            showErrorNotification(error.message);
        }
    };

    const consultarChavePix = async (chave) => {
        try {
           return await consultarChave(chave, user.codigo);
        } catch (error) {
            showErrorNotification(error.message);
        }
    };

    return (
        <ChaveContext.Provider value={{user, criarChavePix, obterChavesPix, consultarChavePix }}>
            {children}
        </ChaveContext.Provider>
    );
}

export function useChave() {
    return useContext(ChaveContext);
}