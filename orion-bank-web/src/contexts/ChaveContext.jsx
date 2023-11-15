import React, { createContext, useContext } from "react";
import { showErrorNotification } from '../shared/notificationUtils';
import { criarChave, obterChavesPorConta } from "../services/chaveApi";
import { AuthContext } from "./AuthContext";


export const ChaveContext = createContext();

export function ChaveProvider({ children }) {
    const { user } = useContext(AuthContext);

    const criarChavePix = async (request) => {
        try {
            await criarChave(request);
        } catch (error) {
            showErrorNotification(error.response.data);
        }
    };

    const obterChavesPix = async () => {
        try {
           return await obterChavesPorConta(user.codigo);
        } catch (error) {
            showErrorNotification(error.response.data);
        }
    };

    return (
        <ChaveContext.Provider value={{user, criarChavePix, obterChavesPix }}>
            {children}
        </ChaveContext.Provider>
    );
}

export function useChave() {
    return useContext(ChaveContext);
}