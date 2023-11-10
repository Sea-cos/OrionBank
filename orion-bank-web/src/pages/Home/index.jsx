import React, { useState, useContext, useEffect } from "react";
import { ContaContext } from "../../contexts/ContaContext";
import btnPix from "../../assets/img/logoPix.png"
import btnExtrato from "../../assets/img/logoExtrato.png"
import btnTransf from "../../assets/img/logoTransf.png"
import btnConta from "../../assets/img/logoConta.png"
import EyeOpen from "../../assets/img/EyeOpen.svg";
import EyeClose from "../../assets/img/EyeClose.svg";
import "./styles.css"

const Home = () => {
    const { buscarSaldo, buscarNome } = useContext(ContaContext);
    const [hideEye, setHideEye] = useState(true);
    const [saldo, setSaldo] = useState(0.00);
    const [nome, setNome] = useState("");

    const hideMoney = () => {
        setHideEye(!hideEye);
    }

    useEffect(() => {
        const fetchSaldo = async () => {
            const saldo = await buscarSaldo();
            setSaldo(saldo);
        };

        const fetchNome = async () => {
            const nome = await buscarNome();
            setNome(nome);
        };

        fetchSaldo();
        fetchNome();
    });

    return (
        <div className="content-wrapper home-page">

            <div className="row">
                <div className="col-md-12 grid-margin">
                    <div className="row">
                        <div className="col-12 col-x1-8 mb-4 mb-x1-0">
                            <h3>Bem vindo, {nome}!</h3>
                            <h6 className="mb-0"> 3 notificações não lidas!</h6>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rowTeste">
                <div className="row2">
                    <div className="mb-3 teste">
                        <div className="card card-tale">
                            <div className="card-body1">
                                <p className="fs-20 mb-1">Saldo atual</p>
                                <div className="saldo">
                                    <p className="fs-23 mb-0"> R$ {saldo}</p>
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

                    <div className="row2">

                        <div className="spaceb">
                            <div className="card card-light-danger">
                                <div className="card-body">
                                    <a href="#"> <img src={btnPix} alt=""></img> </a>
                                </div>
                            </div>
                            <div className="card card-light-danger">
                                <div className="card-body">
                                    <a href="#"> <img src={btnExtrato} alt=""></img> </a>
                                </div>
                            </div>
                            <div className="card card-light-danger">
                                <div className="card-body">
                                    <a href="#"> <img src={btnTransf} alt=""></img> </a>
                                </div>
                            </div>
                            <div className="card card-light-danger">
                                <div className="card-body">
                                    <a href="#"> <img src={btnConta} alt=""></img> </a>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>

                <div className="row">
                    <div className="card col-md-9 ">
                        <div className="card-body">
                            <p className="card-title mb-0">Movimentações recentes</p>
                            <div className="table-responsive">
                                <table className="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th className="pl-0  pb-2 border-bottom">Tipo</th>
                                            <th className="border-bottom pb-2">Valor</th>
                                            <th className="border-bottom pb-2">Data</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="pl-0">Envio Pix</td>
                                            <td><p className="mb-0"><span className="font-weight-bold mr-2">R$ 65</span></p></td>
                                            <td className="text-muted">18/10/2023</td>
                                        </tr>
                                        <tr>
                                            <td className="pl-0">Envio Pix</td>
                                            <td><p className="mb-0"><span className="font-weight-bold mr-2">R$ 54</span></p></td>
                                            <td className="text-muted">17/10/2023</td>
                                        </tr>
                                        <tr>
                                            <td className="pl-0">TED</td>
                                            <td><p className="mb-0"><span className="font-weight-bold mr-2">R$ 22</span></p></td>
                                            <td className="text-muted">17/10/2023</td>
                                        </tr>
                                        <tr>
                                            <td className="pl-0">Transferencia</td>
                                            <td><p className="mb-0"><span className="font-weight-bold mr-2">R$ 46</span></p></td>
                                            <td className="text-muted">15/10/2023</td>
                                        </tr>
                                        <tr>
                                            <td className="pl-0">Transferencia</td>
                                            <td><p className="mb-0"><span className="font-weight-bold mr-2">R$ 17</span></p></td>
                                            <td className="text-muted">15/10/2023</td>
                                        </tr>
                                        <tr>
                                            <td className="pl-0">TED</td>
                                            <td><p className="mb-0"><span className="font-weight-bold mr-2">R$ 52</span></p></td>
                                            <td className="text-muted">13/10/2023</td>
                                        </tr>
                                        <tr>
                                            <td className="pl-0 pb-0">Envio Pix</td>
                                            <td className="pb-0"><p className="mb-0"><span className="font-weight-bold mr-2">R$ 25</span></p></td>
                                            <td className="pb-0">08/10/2023</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>





            </div>

            <div>

            </div>


        </div>
    );
};

export default Home;