import React, { createContext, useState, useContext } from "react";
import { buscarCEP } from "../services/buscarCepApi";
import { showErrorNotification } from '../shared/notificationUtils';

export const BuscarCEPContext = createContext();

export function BuscarCEPProvider({ children }) {
    const [cep, setCEP] = useState(null);

    const buscarCep = async (cep) => {
        try 
        {
            const response = await buscarCEP(cep);
        
            const endereco = {
                logradouro: response?.logradouro ?? "",
                bairro: response?.bairro ?? "",
                localidade: response?.localidade ?? "",
                uf: response?.uf ?? "",
            };
            
            return endereco;
        } catch (error) {
            showErrorNotification(error.message);
        }
    };

    return (
        <BuscarCEPContext.Provider value={{ cep, setCEP, buscarCep }}>
            {children}
        </BuscarCEPContext.Provider>
    );
  }

  export function useBuscarCEP() {
    return useContext(BuscarCEPContext);
  }