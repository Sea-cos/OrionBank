import React, { useState, useContext, useEffect } from "react";
import { SolicitacoesContaContext } from "../../../../contexts/SolicitacoesContaContext";
import "./styles.css"

const SolicitacoesConta = () => {
    const buscarSolicitacoes = useContext(SolicitacoesContaContext).buscarSolicitacoesConta;
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false); // Estado para controlar a visibilidade do modal
    const [selectedMensagemConta, setSelectedMensagemConta] = useState(null);

    useEffect(() => {
        const buscarSolicitacoesConta = async () => {
            const solicitacoes = await buscarSolicitacoes();
            setSolicitacoes(solicitacoes);
        };

        buscarSolicitacoesConta();
    }, []);

    const openModal = (mensagemConta) => {
        setSelectedMensagemConta(mensagemConta);
        setModalIsOpen(true);

        const modal = document.querySelector("dialog");
        modal.showModal()
    };

    const closeModal = () => {
        setSelectedMensagemConta(null);
        setModalIsOpen(false);
    };

    return (
        <div className="container-solicitar">
            <div className="title-solicitar">
                <h5 className="titulo-h5">Solicitações de Contas</h5>
            </div>
            <div className="card-solicitar">
                <div>
                    <dialog  className="modal-solicitar">
                        <p>aaaaaaaaa</p>
                    </dialog>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="hidden">Codigo</th>
                                <th>DtInclusao</th>
                                <th>DtSituacao</th>
                                <th>Situacao</th>
                                <th>Mensagem Conta</th>
                            </tr>
                        </thead>
                        <tbody>
                            {solicitacoes.map((record, index) => (
                                <tr key={index}>
                                    <td className="hidden">{record.Codigo}</td>
                                    <td>{record.DtInclusao}</td>
                                    <td>{record.DtSituacao}</td>
                                    <td>{record.Situacao}</td>
                                    <td>
                                        <button onClick={() => openModal(record.conta)}>
                                            Ver JSON
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SolicitacoesConta;