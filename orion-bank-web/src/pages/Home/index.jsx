import React from "react";
import { useContext } from "react";
import "./styles.css"

import { AuthContext } from "../../contexts/AuthContext";
import Sidebar from "../../components/Sidebar";
import TopNav from "../../components/TesteSidebar";

const Home = () => {
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    }

    return (
        <>

        <TopNav></TopNav>

        

        <div className="main-panel">
            Bem vindo, Marcos
        </div>
            
            
            <button onClick={handleLogout}> Logout </button>
        </>
    );
};

export default Home;