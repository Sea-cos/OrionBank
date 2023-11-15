import React, { useState, useContext, useEffect } from "react";
import { ContaContext } from "../../contexts/ContaContext";
import btnPix from "../../assets/img/logoPix.svg"
import btnExtrato from "../../assets/img/logoExtrato.svg"
import btnTransf from "../../assets/img/logoTransf.svg"
import btnConta from "../../assets/img/logoConta.svg"
import imgCard from "../../assets/img/cartao2img.svg"
import EyeOpen from "../../assets/img/EyeOpen.svg";
import EyeClose from "../../assets/img/EyeClose.svg";
import { Link } from "react-router-dom";
import "./styles.css"

const Home = () => {
    const { buscarSaldo, buscarNome } = useContext(ContaContext);
    const [hideEye, setHideEye] = useState(true);
    const [saldo, setSaldo] = useState(0.00);
    const [nome, setNome] = useState("");
    const [elementoVisivel, setElementoVisivel] = useState(true);

    const hideMoney = () => {
        setHideEye(!hideEye);
        setElementoVisivel(!elementoVisivel);
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
                <div className="col-md-12 mb-4">
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
                                    {elementoVisivel && <p className="fs-23 mb-0"> R$ {saldo}</p>}
                                    {!elementoVisivel && <p className="fs-23 mb-0"> R$ *****</p>}
                                </div>
                            </div>

                            <div>
                                <Link onClick={hideMoney} style={{ cursor: 'pointer' }}>
                                    <i className="teste">
                                        {hideEye && (
                                            <img src={EyeOpen} alt="" />
                                        )}

                                        {!hideEye && (
                                            <img src={EyeClose} alt="" />
                                        )}
                                    </i>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="row-cards">
                        <div className="spaceb">
                            <Link to="/pix" title="Pix">
                                <div className="card card-light-danger">
                                    <div className="btn-body">
                                        <img src={btnPix} alt=""></img>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/" title="Extrato">
                                <div className="card card-light-danger">
                                    <div className="btn-body">
                                        <img src={btnExtrato} alt=""></img>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/" title="Transferência">
                                <div className="card card-light-danger">
                                    <div className="btn-body">
                                        <img src={btnTransf} alt=""></img>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/" title="Conta">
                                <div className="card card-light-danger">
                                    <div className="btn-body">
                                        <img src={btnConta} alt=""></img>
                                    </div>
                                </div>
                            </Link>
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