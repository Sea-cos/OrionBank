import React, { createContext, useState, useContext } from "react";
import { showErrorNotification } from '../shared/notificationUtils';
import { useNavigate } from "react-router-dom";

export const ContaContext = createContext();

export function ContaProvider({ children }) {
    const navigate = useNavigate();

    const buscarSaldo = async (codigoConta) => {
        try 
        {
           
        } catch (error) {
            showErrorNotification(error.message);
        }
    };

    return (
        <ContaContext.Provider value={{ buscarSaldo }}>
            {children}
        </ContaContext.Provider>
    );
  }

  export function useConta() {
    return useContext(ContaContext);
  }