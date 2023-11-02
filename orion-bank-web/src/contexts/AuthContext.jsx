import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api, autenticarUsuario } from "../services/authApi";
import { showSuccessNotification, showErrorNotification } from '../shared/notificationUtils';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recoveredUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (recoveredUser && token){
            setUser(JSON.parse(recoveredUser));
            api.defaults.headers.Authorization = `Bearer ${ token }`;
        }

        setLoading(false);
    }, []);

    const login = async (autenticarRequest) => { 

        try 
        {
            const response = await autenticarUsuario(autenticarRequest)
            
            const loggedUser = {
                user: autenticarRequest.login,
                codigo: response.Codigo,
            }
            
            const token = response.Token;
            localStorage.setItem("user", JSON.stringify(loggedUser));
            localStorage.setItem("token", JSON.stringify(token));
            api.defaults.headers.Authorization = `Bearer ${ token }`;

            showSuccessNotification("Usuário encontrado!")
            setUser(loggedUser);
            navigate("/");
            
        } catch(error) {
            showErrorNotification(error.message);
        }
    };

    const logout = () => { 
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        api.defaults.headers.Authorization = null;
        navigate("/login");
    };

    return (
        <AuthContext.Provider 
            value={{ authenticated: !!user, user, loading, login, logout }}>
            { children }     
        </AuthContext.Provider>
    );
};