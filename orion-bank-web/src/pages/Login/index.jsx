import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import "./styles.css"

const Login = () => {

    const authContext = useContext(AuthContext);
    const authenticated = authContext.authenticated;
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
        <div className="container">
        <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Login</h1>
                                    </div>

                                    <form className="user" onSubmit={ handleSubmit }>
                                        <div className="form-group">
                                            <input 
                                                type="email" 
                                                className="email form-control"
                                                id="email" 
                                                aria-describedby="emailHelp"
                                                placeholder="CPF"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input 
                                                type="password" 
                                                className="password form-control"
                                                id="password" 
                                                placeholder="Senha"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <div className="text-right">
                                                <a className="small" href="forgot-password.html">Esqueceu sua senha?</a>
                                            </div>
                                        </div>
                                        
                                        <div className="form-group">
                                            <button type="button" style={{margin-left:"5px"}} className="botaoSolicitar"> Solicitar Conta </button>
                                            <button type="button" className="botaoLogin"> Login </button>
                                        </div>
                                    </form>

                                    <hr/>  
                                </div>
                            </div>
                            <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Login;