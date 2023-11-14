import React, { createContext, useContext } from "react";
import { showErrorNotification } from '../shared/notificationUtils';
import { criarChave } from "../services/chaveApi";

export const ChaveContext = createContext();

export function ChaveProvider({ children }) {

    const criarChavePix = async (request) => {
        try {
            await criarChave(request);
        } catch (error) {
            showErrorNotification(error.message);
        }
    };

    return (
        <ChaveContext.Provider value={{ criarChavePix }}>
            {children}
        </ChaveContext.Provider>
    );
}

export function useChave() {
    return useContext(ChaveContext);
}