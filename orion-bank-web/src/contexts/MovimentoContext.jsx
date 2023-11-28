import React, { createContext, useContext } from "react";
import { enviarPixPorChave, obterUltimaMovimentacao, obterExtratoConta, enviarPixPorEMV } from "../services/movimentoApi";
import { showErrorNotification, showSuccessNotification } from '../shared/notificationUtils';
import { AuthContext } from "./AuthContext";

export const MovimentoContext = createContext();

export function MovimentoProvider({ children }) {
    const { user } = useContext(AuthContext);

    const enviarPixViaChave = async (request) => {
        try {
            request.codigoContaOrigem = user.codigo
            await enviarPixPorChave(request);

            showSuccessNotification("Pix enviado!");
        } catch (error) {
            showErrorNotification(error.message);
        }
    };

    const enviarPixViaEMV = async (request) => {
        try {
            request.codigoContaOrigem = user.codigo
            await enviarPixPorEMV(request);
            showSuccessNotification("EMV Pago!");
        } catch (error) {
            showErrorNotification(error.message);
        }
    };

    const obterMovimentacao = async () => {
        try {
            return await obterUltimaMovimentacao(user.codigo);
        } catch (error) {
            showErrorNotification(error.message);
        }
    };

    const obterExtrato = async (request) => {
        try {
            return await obterExtratoConta(request);
            
        } catch (error) {
            showErrorNotification(error.message);
        }
    };

    return (
        <MovimentoContext.Provider value={{ user, enviarPixViaChave, obterMovimentacao, obterExtrato, enviarPixViaEMV }}>
            {children}
        </MovimentoContext.Provider>
    );
}

export function useMovimento() {
    return useContext(MovimentoContext);
}