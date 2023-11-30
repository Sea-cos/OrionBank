import React, { } from "react";
import PersonLock from "../../../../assets/img/person-lock.svg";
import "./styles.css"

const Dados = () => {
    return (
        <div className="container-dados">
            <div className="title-dados">
                <h3 className="titulo-h5"> <img alt="" src={PersonLock}></img> Dados</h3>
            </div>
            <div className="card-dados">

            </div>
        </div>
    );
};

export default Dados;