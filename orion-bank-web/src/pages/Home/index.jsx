import React,{useState} from "react";

import "./styles.css"
import EyeOpen from "../../assets/img/EyeOpen.svg";
import EyeClose from "../../assets/img/EyeClose.svg";

import { AuthContext } from "../../contexts/AuthContext";

const Home = () => {

    const [hideEye, setHideEye] = useState(true);

    const hideMoney = () => {

        setHideEye(!hideEye)

    }


    return (
        <div className="content-wrapper home-page">

            <div className="row">
                <div className="col-md-12 grid-margin">
                    <div className="row">
                        <div className="col-12 col-x1-8 mb-4 mb-x1-0">
                            <h3>Bem vindo, Marcos!</h3>
                            <h6 className="mb-0"> 3 notificações não lidas!</h6>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4 grid-margin transparent">
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <div className="card card-tale">
                                <div className="card-body1">
                                    <p className="fs-20 mb-1">Saldo atual</p>
                                    <div className="saldo">
                                        <p className="fs-23 mb-0"> R$ 600,00</p>
                                    </div>
                                </div>

                                <div>

                                    <a onClick={hideMoney}>
                                        <i className="teste">
                                            {hideEye && (
                                                <img src={EyeOpen} alt="" />
                                            )}

                                             {!hideEye && (
                                                <img src={EyeClose} alt="" />
                                            )}                                          
                                        </i>
                                    </a>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;