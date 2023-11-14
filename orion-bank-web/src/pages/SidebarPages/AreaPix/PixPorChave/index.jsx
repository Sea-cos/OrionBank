import React, { useState, useContext, useEffect } from "react";
import Key from "../../../../assets/img/key.svg";
import "./styles.css"

const PixPorChave = () => {

    useEffect(() => {
    }, []);
 
    return (
        <div className="container-pix-por-chave">
            <div className="title-pix-por-chave">
                <h3 className="titulo-h5"> <img src={Key}></img> Pix por Chave</h3>
            </div>
            <div className="card-pix-por-chave">
                <div>
                    <h2>Minhas chaves Pix</h2>
                </div>

   
            </div>
        </div>
    );
};

export default PixPorChave;