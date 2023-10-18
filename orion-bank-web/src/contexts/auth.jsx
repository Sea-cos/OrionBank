import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recoveredUser = localStorage.getItem("user");

        if (recoveredUser){
            setUser(JSON.parse(recoveredUser));
        }

        setLoading(false);
    }, []);

    const login = (email, password) => { 
        console.log("login auth", { email, password });

        //validar login api

        //criar uma session api

        const loggedUser = {
            id: "123",
            email
        };

        localStorage.setItem("user", JSON.stringify(loggedUser));
        //localStorage.setItem("token", JSON.stringify(token));

        if (password === "123"){
            setUser({ id: "123", email });
            navigate("/");
        }
    };

    const logout = () => { 
        console.log("logout");
        setUser(null);
        localStorage.removeItem("user");
        //localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <AuthContext.Provider 
            value={{ authenticated: !!user, user, loading, login, logout }}>
            { children }     
        </AuthContext.Provider>
    );
};