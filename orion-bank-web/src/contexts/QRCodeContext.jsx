import React, { createContext, useContext } from "react";
import { criarQRCode } from "../services/qrCodeApi";
import { showErrorNotification, showSuccessNotification } from '../shared/notificationUtils';
import { AuthContext } from "./AuthContext";


export const QRCodeContext = createContext();

export function QRCodeProvider({ children }) {
    const { user, buscarNomeUsuarioLogado } = useContext(AuthContext);

    const criarQRCodeEstatico = async (request) => {
        try {
            request.codigoConta = user.codigo;
            request.nomeCompleto = buscarNomeUsuarioLogado();
            const response = await criarQRCode(request);
            
            showSuccessNotification("QRCode criado com sucesso!")
            return response;
        } catch (error) {
            showErrorNotification(error.message);
        }
    };

    return (
        <QRCodeContext.Provider value={{ user, criarQRCodeEstatico }}>
            {children}
        </QRCodeContext.Provider>
    );
}

export function useQRCode() {
    return useContext(QRCodeContext);
}