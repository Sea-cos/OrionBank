import React, { useState, useContext, useEffect } from "react";
import Icon from "../../../../assets/img/pix-icon.svg";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import "./styles.css"

const Pix = () => {
    const [modalPixChaveIsOpen, setOpenModalPixChave] = useState(false);
    const [modalPixCopiaColaIsOpen, setOpenModalPixCopiaCola] = useState(false);

    const openModalPixChave = () => {
        setOpenModalPixChave(true);
    };

    const closeModalPixChave = () => {
        setOpenModalPixChave(false);
    };

    const openModalPixCopiaCola = () => {
        setOpenModalPixCopiaCola(true);
    };

    const closeModalPixCopiaCola = () => {
        setOpenModalPixCopiaCola(false);
    };

    useEffect(() => {
    }, []);

    return (
        <div className="container-pix">
            <div className="title-pix">
                <h3 className="titulo-h5"> <img src={Icon} alt=""></img> Pix </h3>
            </div>
            <div className="card-pix">
                <div className="titulo-transacao">
                    <h2 style={{ color: '#DB4648' }}>Escolha o tipo desejado:</h2>
                </div>

                <div className="card-pix-por-chave">
                    <button type="submit" className="botao-um button-pix" onClick={openModalPixChave}> Pix Por Chave </button>
                    <button type="submit" className="botao-um button-pix" onClick={openModalPixCopiaCola}> Pix Copia e Cola </button>
                    <button type="submit" className="botao-um button-pix"> Ler QRCode </button>
                </div>

                <Modal show={modalPixChaveIsOpen} centered >
                    <Modal.Header>
                        <Modal.Title>Pix Por Chave</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        aaa
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModalPixChave}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={modalPixCopiaColaIsOpen} centered >
                    <Modal.Header>
                        <Modal.Title>Pix Copia e Cola</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        aaa
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModalPixCopiaCola}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </div>
    );
};

export default Pix;