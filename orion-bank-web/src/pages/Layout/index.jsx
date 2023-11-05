import React, { useState, useContext, useEffect } from 'react';
import { TipoUsuarioEnum } from '../../constants/enums';
import { Outlet } from 'react-router-dom';
import { SidebarData } from "../../components/SideBar/SidebarData";
import { AuthContext } from "../../contexts/AuthContext";
import SideBar from "../../components/SideBar/SideBar";
import NavBar from "../../components/NavBar/NavBar";
import './styles.css'

const Layout = () => {
    const { logout, buscarTipoUsuario } = useContext(AuthContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const userType = buscarTipoUsuario();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const filterSidebarData = (type) => {
        if (type === TipoUsuarioEnum.ADMIN) {
            return SidebarData;
        } else if (type === TipoUsuarioEnum.USER) {
            return SidebarData.filter(item => item.title !== TipoUsuarioEnum.ADMIN);
        } else {
            return [];
        }
    };

    const filteredSidebarData = filterSidebarData(userType);

    useEffect(() => {
        if (userType !== TipoUsuarioEnum.ADMIN && userType !== TipoUsuarioEnum.USER) {
            logout();
        }
    }, [userType, logout]);

    return (
        <div className="elements">
            <NavBar toggleSidebar={toggleSidebar} />
            <div className="container-fluid page-body-wrapper">
                <SideBar isOpen={isSidebarOpen} sidebarData={filteredSidebarData} />
                <div className="main-panel">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;