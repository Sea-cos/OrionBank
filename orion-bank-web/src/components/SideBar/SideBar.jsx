import React, { useState, useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import Logout from "../../assets/img/logout.svg";
import { Link } from "react-router-dom";
import '@popperjs/core';
import './styles.css';
import '../css/bootstrap/style.css';


const SideBar = ({ isOpen, sidebarData }) => {
    const [subNavOpen, setSubNavOpen] = useState({});
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    }

    const toggleSubNav = (title) => {
        setSubNavOpen((prevState) => ({
            ...prevState,
            [title]: !prevState[title],
        }));
    };

    return (
        <nav id="sidebar" className={`custom ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>

            <ul className="list-unstyled components custom-ul">
                <div className='top-content'>
                    {sidebarData.map((item, index) => (
                        <li key={index}>
                            <Link
                                to={item.path}
                                onClick={() => item.subNav && toggleSubNav(item.title)}
                            >
                                <i className="menu-icon">
                                    <img src={item.icon} alt="" />
                                </i>
                                <span>{item.title}</span>
                            </Link>
                            {item.subNav && subNavOpen[item.title] && (
                                <ul className="sub-nav">
                                    {item.subNav.map((subItem, subIndex) => (
                                        <li key={subIndex}>
                                            <a href={subItem.path}>{subItem.title}</a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </div>
                <div className='bottom-content'>
                    <li className="sidebar-item">
                        <a onClick={handleLogout}>
                            <i className="menu-icon">
                                <img src={Logout} alt="" />
                            </i>
                            <span>Logout</span>
                        </a>
                    </li>
                </div>
            </ul>
        </nav>
    );
};

export default SideBar;