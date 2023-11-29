import React, { useState } from "react";
import Icon from "../../../../assets/img/transf-icon.svg";
import Background from "../../../../assets/img/undraw-transf.svg";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./styles.css"

const Transferir = () => {
    const [modalTransfIsOpen, setOpenModalTransf] = useState(false);
    const [etapa, setEtapa] = useState(1);

    const openModalTransf = () => {
        setOpenModalTransf(true);
    };

    const closeModalTransf = () => {
        setOpenModalTransf(false);
    };

    const avancarEtapa = async () => {
        const isValid = await validarAvancoEtapa();
        if (isValid) {
            setEtapa(etapa + 1);
        }
    };

    const retrocederEtapa = () => {
        setEtapa(etapa - 1);
    }

    const validarAvancoEtapa = async () => {
        return true;
    };

    return (
        <div className="container-trasnf">
            <div className="title-trasnf">
                <h3 className="titulo-h5"> <img src={Icon} alt=""></img> Transferência </h3>
            </div>
            <div className="card-trasnf">
                <div>

                    <div className="mt-3">
                        <img alt="" src={Background}></img>
                        <h5 className="mt-3" style={{ color: "#3f3d56" }}>Realize agora uma transferência bancária.</h5>
                    </div>
                    <div className="mt-5">
                        <button onClick={openModalTransf} id="button-cadastrar" type="submit" className="botao-um button-transf">Transfêrencia interna</button>
                    </div>
                </div>
            </div>

            <Modal show={modalTransfIsOpen} centered >
                <Modal.Header>
                    <Modal.Title style={{ color: '#DB4648' }}>Transferir</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-pix-por-chave">
                        {etapa === 1 && (
                            <>
                                <div>
                                    <label className="mt-4" style={{ color: "#3f3d56" }}>EMV</label>
                                    <input
                                        type="text"
                                        className="form-control emv"
                                        id="chavePix"
                                        placeholder="Código EMV"
                                        name="nome"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={closeModalTransf}>
                        Cancelar
                    </Button>
                    {etapa === 2 && (
                        <Button variant="success" >
                            Confirmar
                        </Button>
                    )}
                    {etapa === 1 && (
                        <Button variant="primary" onClick={avancarEtapa}>
                            Continuar
                        </Button>
                    )}
                    {etapa > 1 && (
                        <Button variant="primary" onClick={retrocederEtapa}>
                            Voltar
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Transferir;