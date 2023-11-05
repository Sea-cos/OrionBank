import React from 'react';
import Bell from "../../assets/img/sino.svg";
import '@popperjs/core';
import './styles.css';

const Sino = ({notificacao, message, count}) => {
    return (
        <div className="sino">
            <ul className="navbar-nav navbar-nav-right">
                <li className="nav-item dropdown">
                    <a className="nav-link count-indicator" id="notificationDropdown" data-toggle="dropdown">
                        <i>
                            <img src={Bell} />
                        </i>
                        <span class="badge rounded-pill badge-notification bg-danger custom-notfication">{count}</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                        <p className="mb-0 font-weight-normal float-left dropdown-header">Notificações</p>
                        <a className="dropdown-item preview-item">
                            <div className="preview-thumbnail">
                                <div className="preview-icon bg-success">
                                    <i className="ti-info-alt mx-0"></i>
                                </div>
                            </div>
                            <div className="preview-item-content">
                                <h6 className="preview-subject font-weight-normal">{notificacao}</h6>
                                <p className="font-weight-light small-text mb-0 text-muted">
                                    {message}
                                </p>
                            </div>
                        </a>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Sino;