import React, { useState } from 'react';
import TituloMenor from "../../assets/img/titulo-menor-2.svg";
import '@popperjs/core';
import './styles.css';

const NavBar = ({ toggleSidebar }) => {
    const [logoVisible, setLogoVisible] = useState(true);

    const handleToggleLogo = () => {
        setLogoVisible(!logoVisible); 
    };
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
            <div className="container-fluid">
                {logoVisible && (
                    <div className="logo-header">
                        <img src={TituloMenor} alt=""></img>
                    </div>
                )}
                <button type="button" id="sidebarCollapse" className="custom-botao" onClick={() => { toggleSidebar(); handleToggleLogo(); }}>
                    <i className="fa fa-bars" />
                </button>
            </div>
        </nav>

    );
};

export default NavBar;