import React, { useState, useContext, useEffect } from "react";
import { ChaveContext } from "../../../../contexts/ChaveContext";
import Key from "../../../../assets/img/key.svg";
import Trash from '../../../../assets/img/trash.svg'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { TipoChavePixEnum } from '../../../../constants/enums';
import Modal from 'react-bootstrap/Modal';
import "./styles.css"

const CadastrarChave = () => {
    const chaveContext = useContext(ChaveContext);
    const criarChavePix = chaveContext.criarChavePix;
    const obterChavesPix = chaveContext.obterChavesPix;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [chaves, setChaves] = useState([]);

    useEffect(() => {
        const buscarChaves = async () => {
            const response = await obterChavesPix();
            if (response !== undefined) {
                setChaves(response);
            }
            console.log(response);
        }
        buscarChaves();
    }, []);

    function formatarEnum(situacao) {
        switch (situacao) {
            case TipoChavePixEnum.CPF:
                return 'CPF';
            case TipoChavePixEnum.EMAIL:
                return 'Email';
            case TipoChavePixEnum.TELEFONE:
                return 'Telefone';
            case TipoChavePixEnum.EVP:
                return 'EVP';
            default:
                return 'Desconhecida';
        }
    }

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className="container-cadastrar">
            <div className="title-solicitar">
                <h3 className="titulo-h5"> <img src={Key}></img> Cadastrar Chave</h3>
            </div>
            <div className="card-cadastrar">
                <Modal show={modalIsOpen} centered >
                    <Modal.Header>
                        <Modal.Title>Cadastrar nova chave</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="modal-cadastro">

                            <select id="tipoDeChave" name="tipoDeChave" className="form-control campo-cadastro">
                                {Object.values(TipoChavePixEnum).map((tipo, index) => (
                                    <option key={index} value={tipo}>
                                        {formatarEnum(tipo)}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="text"
                                className="chavePix form-control"
                                id="chavePix"
                                placeholder="Chave"
                                name="nome"
                                maxLength={8}
                            />
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={closeModal}>
                            Criar
                        </Button>
                        <Button variant="danger" onClick={closeModal}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div>
                    <h2 style={{color: '#DB4648'}}>Minhas chaves Pix</h2>
                </div>
                <div className="div-descricao">
                    <h5 className="titulo-chaves">Com suas chaves, você pode receber Pix através de QR codes ou links e se identificar de forma rápida para receber transferências.</h5>
                </div>

                <Button onClick={openModal} id="button-cadastrar" variant="secondary" className="button-add-chave" as="input" type="submit" value="+ Cadastrar chave" />

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
                                            <span><strong>{formatarEnum(record.TipoChave)}</strong></span>
                                        </div>
                                        <div className="valor-chave">
                                            <span>{record.Chave_Pix}</span>
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
                {chaves.length === 0 && (
                    <h5 className="msg-sem-chaves">Você ainda não possui chaves =(</h5>
                )}
            </div>
        </div>
    );
};

export default CadastrarChave;