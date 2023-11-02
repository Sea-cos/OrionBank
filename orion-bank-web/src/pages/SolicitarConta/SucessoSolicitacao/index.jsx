import { Link, useParams } from "react-router-dom";
import "../styles.css";

const SucessoSolicitacao = () => {
    const { nome } = useParams();

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center vh-100">
                <div className="col-xl-10 col-lg-12 col-md-9 ">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0 ">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 style={{ color: '#DB4648' }} className="h2 mb-4">Quase lá ... !</h1>
                                        </div>

                                        <div>
                                            <div className="container-texto">
                                                <div className="textoSucesso">
                                                    <label>Ei <span className="cor-padrao">{ nome }</span>, seus dados foram enviados para os responsáveis analisarem. 
                                                            Quando a solicitação for aprovada você receberá um e-mail com as novidades. 
                                                            Fique atento!
                                                    </label>
                                                </div>     
                                            </div>  

                                            <div className="form-group">
                                                <Link to="/login"><button type="submit" className="botao-um"> OK </button></Link>                                                       
                                            </div>
                                        </div>
                   
                                    </div>
                                </div>

                                <div className="col-lg-6 d-none d-lg-block bg-solicitar-image-quatro"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SucessoSolicitacao;