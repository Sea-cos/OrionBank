import React from "react";
import { useContext } from "react";
import "./styles.css"

import { AuthContext } from "../../contexts/AuthContext";
import Sidebar from "../../components/Sidebar";

const Home = () => {
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    }

    return (
        <>
        <Sidebar></Sidebar>
            <h1>HomePage</h1>
            <button onClick={handleLogout}> Logout </button>
        </>
    );
};

export default Home;