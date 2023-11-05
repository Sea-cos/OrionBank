import React, { useState } from 'react';
import Sino from "../Notificacao/Sino";
import TituloMenor from "../../assets/img/titulo-menor-2.svg";
import LogoBank from "../../assets/img/logo-melhor.svg";
import '@popperjs/core';
import './styles.css';

const NavBar = ({ toggleSidebar }) => {
    const [logoVisible, setLogoVisible] = useState(true);
    const [buttonClicked, setButtonClicked] = useState(false);

    const handleToggleLogo = () => {
        setLogoVisible(!logoVisible);
        setButtonClicked(!buttonClicked);
    };

    return (
        <nav className="navbar navbar-expand-lg custom-navbar">
            {!logoVisible && (
                <div className="navbar-logo">
                    <div className="logo-bank-header">
                        <img src={LogoBank} alt=""></img>
                    </div>
                </div>
            )}
            {logoVisible && (
                <div className="navbar-titulo">
                    <div className="logo-header">
                        <img src={TituloMenor} alt=""></img>
                    </div>
                </div>
            )}
            <div>
                <button type="button" id="sidebarCollapse" className={`custom-botao ${buttonClicked ? 'move-button' : 'back-button-move'}`} onClick={() => { toggleSidebar(); handleToggleLogo(); }}>
                    <i className="fa fa-bars" />
                </button>
            </div>

            <Sino />
        </nav>
    );
};

export default NavBar;