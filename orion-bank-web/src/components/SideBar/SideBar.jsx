import React, { useState, useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import Logout from "../../assets/img/logout.svg";
import { Link, useLocation } from "react-router-dom";
import '@popperjs/core';
import './styles.css';
import './bootstrap/style.css';

const SideBar = ({ isOpen, sidebarData }) => {
    const { logout } = useContext(AuthContext);
    const location = useLocation();
    const [activeItem, setActiveItem] = useState(null);

    const handleLogout = () => {
        logout();
    }

    const toggleItem = (title) => {
        if (activeItem === title) {
            setActiveItem(null);
        } else {
            setActiveItem(title);
        }
    };

    return (
        <nav id="sidebar" className={`custom ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            <ul className="list-unstyled components custom-ul">
                <div className='top-content'>
                    {sidebarData.map((item, index) => (
                        <li key={index}>
                            <Link
                                to={item.path}
                                className={location.pathname === item.path ? 'active' : ''}
                                onClick={() => toggleItem(item.title)}
                            >
                                <i className="menu-icon">
                                    <img src={item.icon} alt="" />
                                </i>
                                <span className='menu-title'>{item.title}</span>
                            </Link>
                            {item.subNav && (
                                <ul className={`sub-nav ${activeItem === item.title ? 'open' : ''}`}>
                                    {item.subNav.map((subItem, subIndex) => (
                                        <li key={subIndex}>
                                            <Link
                                                to={subItem.path}
                                                className={location.pathname === subItem.path ? 'active' : ''}
                                            >
                                                {subItem.title}
                                            </Link>
                                            {subItem.subSubNav && (
                                                <ul className={`sub-sub-nav ${activeItem === item.title ? 'open' : ''}`}>
                                                    {subItem.subSubNav.map((subSubItem, subSubIndex) => (
                                                        <li key={subSubIndex}>
                                                            <Link
                                                                to={subSubItem.path}
                                                                className={location.pathname === subSubItem.path ? 'active' : ''}
                                                            >
                                                                {subSubItem.title}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </div>
                <div className='bottom-content'>
                    <li className="sidebar-item">
                        <Link to="/login" onClick={handleLogout}>
                            <i className="menu-icon">
                                <img src={Logout} alt="" />
                            </i>
                            <span>Logout</span>
                        </Link>
                    </li>
                </div>
            </ul>
        </nav>
    );
};

export default SideBar;