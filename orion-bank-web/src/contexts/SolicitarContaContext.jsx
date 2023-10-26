import React, { createContext, useState, useContext } from "react";
import { solicitarConta } from "../services/solicitarContaApi";
import { showSuccessNotification, showErrorNotification } from '../shared/notificationUtils';
import { useNavigate } from "react-router-dom";

export const SolicitarContaContext = createContext();

export function SolicitarContaProvider({ children }) {
    const [solicitacao, setSolicitacao] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const solicitar = async (solicitacao) => {

        try 
        {
            debugger
            const response = await solicitarConta(solicitacao);

            if (response.success){
                showSuccessNotification(response.data);
                navigate(`/sucessoSolicitacao/${solicitacao.nome}`);
            }

        } catch (error) {
            setError(error);
            navigate("/sucessoSolicitacao/" + solicitacao.nome);
            showErrorNotification(error.message);
        }

        return false;
    };

    return (
        <SolicitarContaContext.Provider value={{ solicitacao, setSolicitacao, solicitar, error }}>
            {children}
        </SolicitarContaContext.Provider>
    );
  }

  export function useSolicitarConta() {
    return useContext(SolicitarContaContext);
  }