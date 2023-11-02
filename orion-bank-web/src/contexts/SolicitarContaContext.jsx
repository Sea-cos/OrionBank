import React, { createContext, useState, useContext } from "react";
import { solicitarConta } from "../services/solicitarContaApi";
import { showErrorNotification } from '../shared/notificationUtils';
import { useNavigate } from "react-router-dom";

export const SolicitarContaContext = createContext();

export function SolicitarContaProvider({ children }) {
    const [solicitacao, setSolicitacao] = useState(null);
    const navigate = useNavigate();

    const solicitar = async (solicitacao) => {

        try 
        {
            const response = await solicitarConta(solicitacao);

            navigate(`/sucessoSolicitacao/${solicitacao.nome}`);
        } catch (error) {
            showErrorNotification(error.message);
        }
    };

    return (
        <SolicitarContaContext.Provider value={{ solicitacao, setSolicitacao, solicitar }}>
            {children}
        </SolicitarContaContext.Provider>
    );
  }

  export function useSolicitarConta() {
    return useContext(SolicitarContaContext);
  }