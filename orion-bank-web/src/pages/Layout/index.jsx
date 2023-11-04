import React, { useState } from 'react';
import SideBar from "../../components/SideBar/SideBar";
import NavBar from "../../components/NavBar/NavBar";
import { Outlet } from 'react-router-dom';
import { SidebarData } from "../../components/SideBar/SidebarData";
import './styles.css'

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    return (
        <div className="elements">
            <NavBar toggleSidebar={toggleSidebar}/>
            <div className="container-fluid page-body-wrapper">
                <SideBar isOpen={isSidebarOpen} sidebarData={SidebarData}/>
                <div className="main-panel">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;