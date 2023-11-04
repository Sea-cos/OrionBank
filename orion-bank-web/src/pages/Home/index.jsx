import React from "react";
import { useContext } from "react";
import "./styles.css"

import { AuthContext } from "../../contexts/AuthContext";

const Home = () => {
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    }

    return (
        <>
            <div className="home-page">
                <button onClick={handleLogout}> Logout </button>
            </div>
        </>
    );
};

export default Home;