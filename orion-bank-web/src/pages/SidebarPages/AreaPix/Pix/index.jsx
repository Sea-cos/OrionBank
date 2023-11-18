import React, { useState, useContext } from "react";
import { TipoChavePixEnum } from '../../../../constants/enums';
import { showErrorNotification } from '../../../../shared/notificationUtils';
import { ChaveContext } from "../../../../contexts/ChaveContext";
import { MovimentoContext } from "../../../../contexts/MovimentoContext";
import CurrencyInput from "../../../../components/MoneyInput";
import Icon from "../../../../assets/img/pix-icon.svg";
import NotFound from "../../../../assets/img/undraw_no_data.svg";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import "./styles.css"

const Pix = () => {
    const consultarChavePix = useContext(ChaveContext).consultarChavePix;
    const enviarPixViaChave = useContext(MovimentoContext).enviarPixViaChave;
    const [modalPixChaveIsOpen, setOpenModalPixChave] = useState(false);
    const [modalPixCopiaColaIsOpen, setOpenModalPixCopiaCola] = useState(false);
    const [chavesFavoritas, setChavesFavoritas] = useState([]);
    const [chavePix, setChavePix] = useState('');
    const [valor, setValor] = useState('R$ 0,00');
    const [infoIsOn, setInfoIsOn] = useState(false);
    const [infoAdicional, setInfoAdicional] = useState('');
    const [responseConsulta, setResponseConsulta] = useState({});

    const openModalPixChave = () => {
        setOpenModalPixChave(true);
    };

    const closeModalPixChave = () => {
        setChavePix('');
        setValor('R$ 0,00');
        setInfoAdicional('');
        setResponseConsulta({});
        setChavesFavoritas([]);
        setEtapa(1);
        setOpenModalPixChave(false);
    };

    const openModalPixCopiaCola = () => {
        setOpenModalPixCopiaCola(true);
    };

    const closeModalPixCopiaCola = () => {
        setOpenModalPixCopiaCola(false);
    };

    const [etapa, setEtapa] = useState(1);

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
        switch (etapa) {
            case 1:
                if (chavePix === "") {
                    showErrorNotification("Informe a chave pix.");
                    return false;
                }

                const response = await consultarChavePix(chavePix);
                if (response === undefined) {
                    return false;
                }
                setResponseConsulta(response);
                break;

            case 2:
                if (formatarValor(valor) === 0) {
                    showErrorNotification("Informe o valor a pagar.");
                    return false;
                }
                break;
                
            default:
                return false;
        }

        return true;
    };

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

    const formatarCPF = (cpf) => {
        if (cpf !== undefined) {
            return (
                cpf.substring(0, 3) +
                "." +
                cpf.substring(3, 6) +
                "." +
                cpf.substring(6, 9) +
                "-" +
                cpf.substring(9)
            );
        }
    };

    const formatarValor = (value) => {
        if (value === "")
            return 0;

        const formattedValue = parseFloat(value.replace('R$ ', '').replace('.', '').replace(',', '.'));
        return formattedValue;
    };

    const enviarPixPorChave = async (e) => {
        e.preventDefault();
        const request = {
            codigoContaDestino: responseConsulta.Codigo,
            codigoContaOrigem: '',
            valor: formatarValor(valor),
            chavePix: chavePix,
            infoAdicional: infoAdicional
        }
        await enviarPixViaChave(request);
        closeModalPixChave();
    };

    return (
        <div className="container-pix">
            <div className="title-pix">
                <h3 className="titulo-h5"> <img src={Icon} alt=""></img> Pix </h3>
            </div>
            <div className="card-pix">
                <div className="titulo-transacao">
                    <h2 style={{ color: '#DB4648' }}>Escolha o tipo desejado:</h2>
                </div>
                <div className="card-pix-buttons">
                    <button type="submit" className="botao-um button-pix" onClick={openModalPixChave}> Pix Por Chave </button>
                    <button type="submit" className="botao-um button-pix" onClick={openModalPixCopiaCola}> Pix Copia e Cola </button>
                    <button type="submit" className="botao-um button-pix"> Ler QRCode </button>
                </div>

                <Modal show={modalPixChaveIsOpen} centered >
                    <Modal.Header>
                        <Modal.Title style={{ color: '#DB4648' }}>Pix Por Chave</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container-pix-por-chave">
                            {etapa === 1 && (
                                <>
                                    <div>
                                        <label className="mt-4" style={{ color: "#3f3d56" }}>Chave</label>
                                        <input
                                            type="text"
                                            className="form-control chave-pix"
                                            id="chavePix"
                                            placeholder="CPF, celular, e-mail ou aleatória"
                                            name="nome"
                                            value={chavePix}
                                            onChange={(e) => setChavePix(e.target.value)}
                                        />
                                    </div>
                                    <div className="table-chave-favorita">
                                        <label className="mt-5" style={{ color: "#3f3d56" }}>Chaves Favoritas</label>
                                        {chavesFavoritas.length > 0 && (
                                            <Table hover responsive className="table-favorita-chave table-rounded">
                                                <thead>
                                                    <tr>
                                                        <th className="hidden">Codigo</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {chavesFavoritas.map((record, index) => (
                                                        <tr key={index} >
                                                            <td className="hidden">{record.Codigo}</td>
                                                            <td>
                                                                <div className="tipo-chave">
                                                                    <span><strong>{formatarEnum(record.TipoChave)} - {record.Nome}</strong></span>
                                                                </div>
                                                                <div className="valor-chave">
                                                                    <span>{record.Chave_Pix}</span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        )}
                                        {chavesFavoritas.length === 0 && (
                                            <div className="not-found-favoritas mt-2">
                                                <img alt="" src={NotFound}></img>
                                                <label className="mt-3" style={{ color: "#3f3d56", fontSize: "11px" }}>Você ainda não possui chaves favoritas.</label>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}

                            {etapa === 2 && (
                                <>
                                    <div className="body-pagar">
                                        <label className="mt-4" style={{ color: "#3f3d56", fontSize: '20px' }}>Valor a pagar</label>
                                        <CurrencyInput className="valor-pix" style={{ fontSize: '5rem' }} value={valor} onValueChange={setValor} />
                                        <label className="mt-4 mb-0" style={{ color: "#3f3d56", fontSize: '13px' }}>Pagar para</label>
                                        <label style={{ color: "#DB4648", fontSize: '15px' }}>{responseConsulta.NomeCompleto}</label>
                                    </div>
                                </>
                            )}

                            {etapa === 3 && (
                                <>
                                    <div className="body-pagar">
                                        <label style={{ color: "#3f3d56", fontSize: '20px' }}>Revisão</label>

                                        <div className="revisao-recebedor mt-4">
                                            <div className="quem-receber">
                                                <label style={{ color: "#3f3d56", fontSize: '17px' }}>Quem vai receber?</label>
                                            </div>
                                            <div className="dados-recebedor">
                                                <div className="dados-space">
                                                    <label style={{ color: "#3f3d56", fontSize: '14px' }}>Nome:</label>
                                                    <label style={{ color: "#3f3d56", fontSize: '14px' }}>{responseConsulta.NomeCompleto}</label>
                                                </div>
                                                <div className="dados-space">
                                                    <label style={{ color: "#3f3d56", fontSize: '14px' }}>CPF:</label>
                                                    <label style={{ color: "#3f3d56", fontSize: '14px' }}>{formatarCPF(responseConsulta.DocumentoFederal)}</label>
                                                </div>
                                                <div className="dados-space">
                                                    <label style={{ color: "#3f3d56", fontSize: '14px' }}>Instituição:</label>
                                                    <label style={{ color: "#3f3d56", fontSize: '14px' }}>Orion Bank S.A.</label>
                                                </div>
                                                <div className="dados-space">
                                                    <label style={{ color: "#3f3d56", fontSize: '14px' }}>Chave Pix:</label>
                                                    <label style={{ color: "#3f3d56", fontSize: '14px' }}>{responseConsulta.Chave_Pix}</label>
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <label className="add-mensagem" onClick={() => setInfoIsOn(!infoIsOn)}>Adicionar mensagem</label>
                                                {infoIsOn && (
                                                    <input
                                                        type="text"
                                                        className="form-control infoAdicional"
                                                        id="infoAdicional"
                                                        placeholder="Mensagem"
                                                        name="infoAdicional"
                                                        maxLength={255}
                                                        value={infoAdicional}
                                                        onChange={(e) => setInfoAdicional(e.target.value)}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={closeModalPixChave}>
                            Cancelar
                        </Button>
                        {etapa === 3 && (
                            <Button variant="success" onClick={enviarPixPorChave}>
                                Confirmar
                            </Button>
                        )}
                        {etapa !== 3 && (
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