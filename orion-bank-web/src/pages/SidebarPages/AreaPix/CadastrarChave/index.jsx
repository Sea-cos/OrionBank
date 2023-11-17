import React, { useState, useContext, useEffect } from "react";
import { ChaveContext } from "../../../../contexts/ChaveContext";
import { TipoChavePixEnum } from '../../../../constants/enums';
import { showErrorNotification } from '../../../../shared/notificationUtils';
import NotFound from "../../../../assets/img/undraw_stars.svg";
import Key from "../../../../assets/img/key.svg";
import Trash from '../../../../assets/img/trash.svg'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import "./styles.css"

const CadastrarChave = () => {
    const chaveContext = useContext(ChaveContext);
    const criarChavePix = chaveContext.criarChavePix;
    const obterChavesPix = chaveContext.obterChavesPix;
    const inativarChavePix = chaveContext.inativarChavePix;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [chaves, setChaves] = useState([]);
    const [tamanho, setTamanho] = useState(11);
    const [cadastrarChavePix, setCadastrarChavePix] = useState({ codigoConta: "", chavePix: "", tipoChave: 1 });

    const cadastrarChave = async (e) => {
        e.preventDefault();
        const isValid = validarChavePix();

        if (isValid) {
            await criarChavePix(cadastrarChavePix);
            await buscarChaves();
            limparCampos();
            closeModal();
        }
    };

    const excluirChave = async (codigoChave) => {
        await inativarChavePix(codigoChave);
        await buscarChaves();
    };

    function validarEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    }

    function validarChavePix() {
        if (cadastrarChavePix.chavePix === "") {
            showErrorNotification('Informe uma Chave Pix.');
            return false;
        }

        switch (cadastrarChavePix.tipoChave) {
            case TipoChavePixEnum.CPF:

                break;
            case TipoChavePixEnum.EMAIL:
                if (!validarEmail(cadastrarChavePix.chavePix)) {
                    showErrorNotification('Informe um e-mail válido.');
                    return false;
                }
                break;
            case TipoChavePixEnum.TELEFONE:

                break;

            default:
                break;
        }

        return true;
    }

    useEffect(() => {
        buscarChaves();
    }, []);

    const buscarChaves = async () => {
        const response = await obterChavesPix();
        if (response !== undefined) {
            setChaves(response);
        }
    }

    function formatarEnum(situacao) {
        switch (situacao) {
            case TipoChavePixEnum.CPF:
                return 'CPF';
            case TipoChavePixEnum.EMAIL:
                return 'Email';
            case TipoChavePixEnum.TELEFONE:
                return 'Telefone';
            default:
                return 'Desconhecida';
        }
    }

    function limparCampos() {
        cadastrarChavePix.chavePix = "";
    }

    function mudarTamanho(tipoChave) {
        switch (tipoChave) {
            case TipoChavePixEnum.CPF:
            case TipoChavePixEnum.TELEFONE:
                setTamanho(11);
                break;

            default:
                setTamanho(200);
                break;
        }
        limparCampos();
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
                <Modal show={modalIsOpen} centered className="modal-pix">
                    <Modal.Header>
                        <Modal.Title style={{ color: '#DB4648' }}>Cadastrar nova chave</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="modal-cadastro">

                            <select
                                id="tipoDeChave"
                                name="tipoDeChave"
                                className="form-control campo-cadastro"
                                value={cadastrarChavePix.tipoChave}
                                onChange={(e) => {
                                    setCadastrarChavePix({ ...cadastrarChavePix, tipoChave: parseInt(e.target.value, 10) });
                                    mudarTamanho(parseInt(e.target.value, 10));
                                }}
                            >
                                {Object.values(TipoChavePixEnum).map((tipo, index) => (
                                    <option
                                        key={index}
                                        value={tipo}
                                        onChange={(e) => {

                                        }}
                                    >
                                        {formatarEnum(tipo)}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="text"
                                className="form-control campo-chave"
                                id="chavePix"
                                placeholder="Chave"
                                name="nome"
                                maxLength={tamanho}
                                value={cadastrarChavePix.chavePix}
                                onChange={(e) => setCadastrarChavePix({ ...cadastrarChavePix, chavePix: e.target.value })}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={closeModal}>
                            Cancelar
                        </Button>
                        <Button type="submit" onClick={cadastrarChave} variant="success">
                            Criar
                        </Button>
                    </Modal.Footer>
                </Modal>

                <div>
                    <h2 style={{ color: '#DB4648' }}>Minhas chaves Pix</h2>
                </div>
                <div className="div-descricao">
                    <h5 className="titulo-chaves">Com suas chaves, você pode receber Pix através de QR codes ou links e se identificar de forma rápida para receber transferências.</h5>
                </div>

                <Button onClick={openModal} id="button-cadastrar" variant="secondary" className="button-add-chave" as="input" type="submit" value="+ Cadastrar chave" />
                {chaves.length > 0 && (
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
                                        <td className="trash-pix">
                                            <img className="img-excluir-chave" onClick={() => excluirChave(record.Codigo)} src={Trash}></img>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )}
                {chaves.length === 0 && (
                    <div className="mt-3">
                        <img src={NotFound}></img>
                        <h5 className="mt-3" style={{ color: "#3f3d56" }}>Você ainda não possui chaves cadastradas.</h5>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CadastrarChave;