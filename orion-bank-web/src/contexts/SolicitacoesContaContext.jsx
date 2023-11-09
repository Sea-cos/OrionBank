import React, { createContext, useState, useContext } from "react";
import { solicitarConta, buscarSolicitacoes } from "../services/solicitacoesContaApi";
import { showErrorNotification } from '../shared/notificationUtils';
import { useNavigate } from "react-router-dom";

export const SolicitacoesContaContext = createContext();

export function SolicitacoesContaProvider({ children }) {
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
    
    const buscarSolicitacoesConta = async () => {
        try 
        {
            return buscarSolicitacoes();
        } catch (error) {
            showErrorNotification(error.message);
        }
    };

    return (
        <SolicitacoesContaContext.Provider value={{ solicitacao, setSolicitacao, solicitar, buscarSolicitacoesConta }}>
            {children}
        </SolicitacoesContaContext.Provider>
    );
  }

  export function useSolicitacoesConta() {
    return useContext(SolicitacoesContaContext);
  }