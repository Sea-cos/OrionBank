import React, { useState } from "react";
import btnPix from "../../assets/img/logoPix.png"
import btnExtrato from "../../assets/img/logoExtrato.png"
import btnTransf from "../../assets/img/logoTransf.png"
import btnConta from "../../assets/img/logoConta.png"
import imgCard from "../../assets/img/cartao2img.svg"
import "./styles.css"
import EyeOpen from "../../assets/img/EyeOpen.svg";
import EyeClose from "../../assets/img/EyeClose.svg";
import { Link } from "react-router-dom";

const Home = () => {

    const [hideEye, setHideEye] = useState(true);

    const hideMoney = () => {

        setHideEye(!hideEye)

    }


    return (
        <div className="content-wrapper home-page">

            <div className="row">
                <div className="col-md-12 mb-4">
                    <div className="row">
                        <div className="col-12 col-x1-8 mb-4 mb-x1-0">
                            <h3>Bem vindo, Marcos!</h3>
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

                    <div className="row-cards">

                        <div className="spaceb">

                           
                                <div className="card card-light-danger">
                                    <div className="btn-body">
                                        <a href="#" title="Pix"> <img src={btnPix} alt=""></img> </a>
                                    </div>
                                </div>
                                <div className="card card-light-danger">
                                    <div className="btn-body">
                                        <a href="#" title="Extrato"> <img src={btnExtrato} alt=""></img> </a>
                                    </div>
                                </div>
                          

                           
                                <div className="card card-light-danger">
                                    <div className="btn-body">
                                        <a href="#" title="Transferência"> <img src={btnTransf} alt=""></img> </a>
                                    </div>
                                </div>
                                <div className="card card-light-danger">
                                    <div className="btn-body">
                                        <a href="#" title="Conta"> <img src={btnConta} alt=""></img> </a>
                                    </div>
                                </div>
                            
                        </div>


                    </div>

                </div>

                <div className="row3">
                    <div className="tabelita">
                        <div className="card-body">
                            <p className="card-title mb-0 titulo-tabela">Ultimas movimentações</p>
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

                    <div className="cartao">
                        <div className="card-cartao">
                            <div className="mb-3 fs-20">
                                <div className="texto-card">Solicite um cartão de crédito</div>
                                <img src={imgCard} alt="imagem de um cartão" className="cartao-img" />

                            </div>

                            <div className="middle">
                                <div className="">
                                    <Link to="#"> <button type="submit" className="btn-solicita">Solicitar</button> </Link>
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