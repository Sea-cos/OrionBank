import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import InputMask from 'react-input-mask';
import { SolicitarContaContext } from "../../contexts/SolicitarContaContext";
import Circulo from "../../assets/img/circulo.svg";
import CirculoPreto from "../../assets/img/circulo-preto.svg"
import Avancar from "../../assets/img/avancar.svg";
import Retroceder from "../../assets/img/retroceder.svg";
import { showErrorNotification } from '../../shared/notificationUtils';
import "./styles.css";

const SolicitarConta = () => {
    const solicitarContaContext = useContext(SolicitarContaContext);
    const solicitar = solicitarContaContext.solicitar;

    const [solicitacaoRequest, setSolicitacaoRequest] = useState({ 
        nome: '', 
        sobrenome: '',
        email: '', 
        dtNasc: '',
        telefoneCelular: '',
        estado: '',
        cidade: '',
        logadouro: '',
        cep: '',
        numero: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("request", {solicitacaoRequest});

        if (isChecked){
            await solicitar(solicitacaoRequest);
        } else {
            showErrorNotification("Aceite os termos e politica de privacidade.");
        }
    };


    const [etapa, setEtapa] = useState(1);

    const avancarEtapa = () => {
        setEtapa(etapa + 1);
    };

    const retrocederEtapa = () => {
        setEtapa(etapa - 1);
    }

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center vh-100">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 style={{ color: '#DB4648' }} className="h2 mb-4">Solicitar Conta</h1>
                                        </div>

                                        <form className="user" onSubmit={handleSubmit}>
                                            {etapa === 1 && (
                                                <div className="campos">
                                                    <div className="form-group row">
                                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                                            <input 
                                                                type="text" 
                                                                required
                                                                className="name form-control"
                                                                id="name" 
                                                                aria-describedby="nameHelp"
                                                                placeholder="Nome"
                                                                value={solicitacaoRequest.nome}
                                                                onChange={(e) => setSolicitacaoRequest({ ...solicitacaoRequest, nome: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <input 
                                                                type="text"
                                                                required 
                                                                className="sobrenome form-control"
                                                                id="sobrenome" 
                                                                aria-describedby="sobrenomeHelp"
                                                                placeholder="Sobrenome"
                                                                value={solicitacaoRequest.sobrenome}
                                                                onChange={(e) => setSolicitacaoRequest({ ...solicitacaoRequest, sobrenome: e.target.value })}
                                                            />
                                                        </div>
                                                    </div> 

                                                    <div className="form-group row">
                                                        <div className="col-sm-12 mb-0 mb-sm-0">
                                                            <input 
                                                                type="email"
                                                                required
                                                                className="email form-control"
                                                                id="email" 
                                                                aria-describedby="emailHelp"
                                                                placeholder="E-mail"
                                                                value={solicitacaoRequest.email}
                                                                onChange={(e) => setSolicitacaoRequest({ ...solicitacaoRequest, email: e.target.value })}
                                                            />
                                                        </div>
                                                    </div> 

                                                    <div className="form-group row">
                                                        <div className="col-sm-12 mb-0 mb-sm-0">
                                                            <InputMask 
                                                                type="text"
                                                                required 
                                                                mask="99/99/9999"
                                                                className="date form-control"
                                                                id="dtNasc" 
                                                                aria-describedby="dateHelp"
                                                                placeholder="Data de Nascimento"
                                                                value={solicitacaoRequest.dtNasc}
                                                                onChange={(e) => setSolicitacaoRequest({ ...solicitacaoRequest, dtNasc: e.target.value })}
                                                            />
                                                        </div>
                                                    </div> 

                                                    <div className="form-group row">
                                                        <div className="col-sm-12 mb-3 mb-sm-0">
                                                            <InputMask 
                                                                type="phone"
                                                                required
                                                                mask="(99) 99999-9999"
                                                                className="phone form-control"
                                                                id="phone" 
                                                                aria-describedby="phoneHelp"
                                                                placeholder="Telefone Celular"
                                                                value={solicitacaoRequest.telefoneCelular}
                                                                onChange={(e) => setSolicitacaoRequest({ ...solicitacaoRequest, telefoneCelular: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>   
                                                </div>       
                                            )}

                                            {etapa === 2 && (
                                                <div className="campos">
                                                    <div className="form-group row">
                                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                                            <input 
                                                                type="text"
                                                                required
                                                                className="cep form-control"
                                                                id="cep" 
                                                                aria-describedby="cepHelp"
                                                                placeholder="CEP"
                                                                value={solicitacaoRequest.cep}
                                                                onChange={(e) => setSolicitacaoRequest({ ...solicitacaoRequest, cep: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <input 
                                                                type="text"
                                                                required
                                                                className="numero form-control"
                                                                id="numero" 
                                                                aria-describedby="numeroHelp"
                                                                placeholder="Numero"
                                                                value={solicitacaoRequest.numero}
                                                                onChange={(e) => setSolicitacaoRequest({ ...solicitacaoRequest, numero: e.target.value })}
                                                            />
                                                        </div>
                                                    </div> 

                                                    <div className="form-group row">
                                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                                            <input 
                                                                type="text"
                                                                required
                                                                className="estado form-control"
                                                                id="estado" 
                                                                aria-describedby="estadoHelp"
                                                                placeholder="Estado"
                                                                value={solicitacaoRequest.estado}
                                                                onChange={(e) => setSolicitacaoRequest({ ...solicitacaoRequest, estado: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <input 
                                                                type="text"
                                                                required
                                                                className="cidade form-control"
                                                                id="cidade" 
                                                                aria-describedby="cidadeHelp"
                                                                placeholder="Cidade"
                                                                value={solicitacaoRequest.cidade}
                                                                onChange={(e) => setSolicitacaoRequest({ ...solicitacaoRequest, cidade: e.target.value })}
                                                            />
                                                        </div>
                                                    </div> 

                                                    <div className="form-group row">
                                                        <div className="col-sm-12 mb-0 mb-sm-0">
                                                            <input 
                                                                type="text"
                                                                required
                                                                className="logadouro form-control"
                                                                id="logadouro" 
                                                                aria-describedby="logadouroHelp"
                                                                placeholder="Logadouro"
                                                                value={solicitacaoRequest.logadouro}
                                                                onChange={(e) => setSolicitacaoRequest({ ...solicitacaoRequest, logadouro: e.target.value })}
                                                            />
                                                        </div>
                                                    </div> 
                                                </div>       
                                            )}         

                                            {etapa === 3 && (
                                                <div>
                                                    <div className="campos">
                                                        <div className="textoFinal">
                                                            <label>Confirme os dados preenchidos e prossiga para a criação da conta.</label>
                                                        </div>
                                                        <div className="checkboxForm">
                                                            <input
                                                                className="checkbox"
                                                                type="checkbox"
                                                                checked={isChecked}
                                                                onChange={handleCheckboxChange}
                                                            />
                                                            <label> 
                                                                Eu concordo com os <a style={{color: '#DB4648'}} href="">Termos</a> e <a style={{color: '#DB4648'}} href="">Politica de privacidade</a>.
                                                            </label>
                                                        </div> 

                                                        <div className="form-group">
                                                            <button type="submit" className="botao-um"> Enviar </button>
                                                            <Link to="/login"><button type="button" className="botao-dois"> Cancelar </button></Link>
                                                        </div> 
                                                    </div> 
                                                </div>
                                            )}

                                            <div className="slideGroup">
                                                
                                                {etapa > 1   && (
                                                    <img src={Retroceder} className="flecha" alt="" onClick={retrocederEtapa}/>
                                                )}

                                                {etapa === 1 && (
                                                    <div className="slide">
                                                        <img src={CirculoPreto} className="circulo-preto" alt="" />
                                                        <img src={Circulo} className="slideTres" alt="" />
                                                        <img src={Circulo} className="slideTres" alt="" />
                                                    </div>
                                                )}

                                                {etapa === 2 && (
                                                    <div className="slide">
                                                        <img src={CirculoPreto} className="circulo-preto" alt=""/>
                                                        <img src={CirculoPreto} className="circulo-preto" alt=""/>
                                                        <img src={Circulo} className="slideTres" alt="" />
                                                    </div>
                                                )}

                                                {etapa === 3 && (
                                                    <div className="slide">
                                                        <img src={CirculoPreto} className="circulo-preto" alt=""/>
                                                        <img src={CirculoPreto} className="circulo-preto" alt=""/>
                                                        <img src={CirculoPreto} className="circulo-preto" alt=""/>
                                                    </div>
                                                )}

                                                {etapa < 3   && (
                                                    <img src={Avancar} className="flecha" alt="" onClick={avancarEtapa}/>
                                                )}
                                            </div>                                                       
                                        </form> 
                                    </div>
                                </div>

                                {etapa === 1   && (
                                    <div className="col-lg-6 d-none d-lg-block bg-solicitar-image"></div>
                                )}

                                {etapa === 2   && (
                                    <div className="col-lg-6 d-none d-lg-block bg-solicitar-image-dois"></div>
                                )}

                                {etapa === 3   && (
                                    <div className="col-lg-6 d-none d-lg-block bg-solicitar-image-tres"></div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SolicitarConta;