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
            const request = {
                documentoFederal: solicitacao.documentoFederal.replace(/\D/g, ''),
                nomeCompleto: `${solicitacao.nome} ${solicitacao.sobrenome}`,
                email: solicitacao.email,
                dtNasc: solicitacao.dtNasc,
                telefoneCelular: solicitacao.telefoneCelular.replace(/\D/g, ''),
                cep: solicitacao.cep.replace(/\D/g, ''),
                logradouro: solicitacao.logradouro,
                numeroResidencial: solicitacao.numero,
            };

            await solicitarConta(request);
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