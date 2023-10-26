import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import InputMask from 'react-input-mask';
import "./styles.css"

const Login = () => {

    const authContext = useContext(AuthContext);
    const login = authContext.login;
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("submit", {email, password});

        //Aqui eu chamo meu login dentro do auth.
        login(email, password);
    };

    return(
        <div className="container ">
            <div className="row justify-content-center align-items-center vh-100">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 style={{ color: '#DB4648' }} className="h2 mb-4">Login</h1>
                                        </div>

                                        <form className="user" onSubmit={ handleSubmit }>
                                            <div className="form-group">
                                                <InputMask 
                                                    mask="999.999.999-99" 
                                                    type="text" 
                                                    className="cpf form-control"
                                                    id="cpf" 
                                                    aria-describedby="cpfHelp"
                                                    placeholder="CPF"
                                                    value={email}
                                                    required
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input 
                                                    type="password" 
                                                    className="password form-control"
                                                    id="password" 
                                                    placeholder="Senha"
                                                    name="nome"
                                                    value={password}
                                                    required
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                                <div className="text-right">
                                                    <a className="small" href="forgot-password.html">Esqueceu sua senha?</a>
                                                </div>
                                            </div>
                                            
                                            <hr/>  
                                            <div className="form-group">
                                                <Link to="/solicitarConta"><button type="button" className="botao-um"> Solicitar Conta </button></Link>
                                                <button type="submit" onClick={handleSubmit} className="botao-dois"> Login </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;