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

    const login = async (email, password) => { 

        try 
        {
            localStorage.setItem("user", JSON.stringify("loggedUser"));
            localStorage.setItem("token", JSON.stringify("token"));
            // const response = await autenticarUsuario(email, password)
        
            // if (response.success){
            //     //Criar uma session para pegar o token.
            //     const loggedUser = response.data.user;
            //     const token = response.data.token;

            //     localStorage.setItem("user", JSON.stringify(loggedUser));
            //     localStorage.setItem("token", JSON.stringify(token));

            //     api.defaults.headers.Authorization = `Bearer ${ token }`;
            //     //Se o retorno da Api for sucesso, setar o user e mover pra home.

            //     setUser(loggedUser);
                 navigate("/");
            // }

           // showErrorNotification(response.message);

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