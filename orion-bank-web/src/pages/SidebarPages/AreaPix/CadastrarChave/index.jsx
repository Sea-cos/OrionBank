import React, { useState, useContext, useEffect } from "react";
import Trash from '../../../../assets/img/trash.svg'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import "./styles.css"

const CadastrarChave = () => {
    const [chaves, setChaves] = useState([]);

    useEffect(() => {
        const setChaveFake = () => {
            setChaves([{ Chave: '08175537973', TipoChave: 'CPF' }, { Chave: '13289811930124', TipoChave: 'CNPJ' }]);
        };

        setChaveFake();
    }, []);

    return (
        <div className="container-cadastrar">
            <div className="title-solicitar">
                <h3 className="titulo-h5"> {'->'} Cadastrar Chave</h3>
            </div>
            <div className="card-cadastrar">
                <div>
                    <h2>Minhas chaves Pix</h2>
                </div>
                <div className="div-descricao">
                    <h5 className="titulo-h5">Com suas chaves, você pode receber Pix através de QR codes ou links e se identificar de forma rápida para receber transferências.</h5>
                </div>

                <Button id="button-cadastrar" variant="secondary" className="button-add-chave" as="input" type="submit" value="+ Cadastrar chave" />

                <div className="table-consulta-chave">
                    <Table hover responsive className="table-cadastra-chave">
                        <thead>
                            <tr>
                                <th className="hidden">Codigo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chaves.map((record, index) => (
                                <tr key={index} >
                                    <td className="hidden">{record.Codigo}</td>
                                    <td>
                                        <div className="tipo-chave">
                                            <span><strong>{record.TipoChave}</strong></span>
                                        </div>
                                        <div className="valor-chave">
                                            <span>{record.Chave}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <img src={Trash}></img>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default CadastrarChave;