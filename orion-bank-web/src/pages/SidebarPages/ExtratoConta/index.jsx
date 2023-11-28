import React, { useState, useContext, useEffect } from "react";
import { ContaContext } from "../../../contexts/ContaContext";
import { MovimentoContext } from "../../../contexts/MovimentoContext";
import { TipoTransacaoEnum } from "../../../constants/enums";
import pageExtrato from "../../../assets/img/pageExtrato.svg";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import "./styles.css";
import FileSaver, { saveAs } from "file-saver";


const ExtratoConta = () => {
    const { buscarSaldo } = useContext(ContaContext);
    const { user, obterExtrato, exportarPdf } = useContext(MovimentoContext);
    let [extrato, setExtrato] = useState([]);
    const [dtInicio, setdtInicio] = useState('');
    const [dtFim, setdtFim] = useState('');
    const [saldo, setSaldo] = useState(0.00);

    const gerarExtrato = async () => {
        setExtrato([]);
        const request = {
            codigoConta: user.codigo,
            dataInicio: dtInicio,
            dataFim: dtFim
        }
        extrato = await obterExtrato(request);

        if (extrato !== undefined)
            setExtrato(extrato);
    };

    const extratoPDF = async () => {
        debugger

        try {
            const request = {
                codigoConta: user.codigo,
                dataInicio: dtInicio,
                dataFim: dtFim
            }

            const pdfContent = await exportarPdf(request);

            const blob = new Blob([pdfContent], { type: 'application/pdf' });
          

            FileSaver.saveAs(blob, 'extrato.pdf')

        } catch (error) {
            console.error(error);
        }
    };

    function formatarData(data) {
        const dataObj = new Date(data);
        const dia = String(dataObj.getDate()).padStart(2, '0');
        const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
        const ano = dataObj.getFullYear().toString().slice(-2);
        const hora = dataObj.getHours();
        const minuto = dataObj.getMinutes();
        return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
    }

    function formatarEnum(situacao) {
        switch (situacao) {
            case TipoTransacaoEnum.PIX:
                return 'Pix';
            case TipoTransacaoEnum.TED:
                return 'Ted';
            case TipoTransacaoEnum.QrCode:
                return 'QrCode';
            default:
                return 'Desconhecida';
        }
    }

    function formatarDinDin(valor) {
        const dindinFormatado = parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return dindinFormatado;
    }

    useEffect(() => {
        const fetchSaldo = async () => {
            const saldo = await buscarSaldo();
            const saldoFormatado = parseFloat(saldo).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            setSaldo(saldoFormatado);
        };
        fetchSaldo();
    }, []);

    return (
        <div className="container-solicitar">
            <div className="title-solicitar">
                <h3 className="titulo-h5"> <img alt="" src={pageExtrato}></img> Solicitações de Contas</h3>
            </div>

            <div className="card-solicitar">
                <div className="linha-superior">

                    <div className="">
                        <div className="card-extrato">
                            <div>
                                <p> Saldo atual: {saldo}</p>
                            </div>


                        </div>
                    </div>

                    <div>

                        <input
                            type="date"
                            name="nDtInicio"
                            id="IDtInicio"
                            value={dtInicio}
                            onChange={(e) => setdtInicio(e.target.value)}
                        />
                        <input
                            type="date"
                            name="nDtFim"
                            id="iDtFim"
                            value={dtFim}
                            onChange={(e) => setdtFim(e.target.value)}
                        />
                        <Button variant="success" as="input" type="submit" value="Filtrar" className="estilo-botao" onClick={gerarExtrato} />
                    </div>

                    <div>
                        <Button variant="success" as="input" type="submit" value="Exportar" className="estilo-botao" onClick={extratoPDF} />
                    </div>
                </div>

                <div className="table-solicitar">

                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Data/Hora</th>
                                <th>Tipo</th>
                                <th>Lançamento</th>
                                <th>Descrição</th>
                                <th>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {extrato.map((record, index) => (
                                <tr key={index}>
                                    <td>{formatarData(record.Data)}</td>
                                    <td>{formatarEnum(record.TipoTransacao)}</td>
                                    <td>{record.IsSaida === true ? record.NomeDestino : record.NomeOrigem}</td>
                                    <td>{record.Descricao}</td>
                                    <td>{record.CodigoContaOrigem === user.codigo ?
                                        <span style={{ "color": "red" }}>-{formatarDinDin(record.Valor)}</span> :
                                        <span style={{ "color": "green" }}>+{formatarDinDin(record.Valor)}</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );

}

export default ExtratoConta;