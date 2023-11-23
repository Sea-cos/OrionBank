import React, { useState, useContext, useEffect } from "react";
import { ContaContext } from "../../../contexts/ContaContext";
import { MovimentoContext } from "../../../contexts/MovimentoContext";
import { TipoTransacaoEnum } from "../../../constants/enums";
import pageExtrato from "../../../assets/img/pageExtrato.svg";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import "./styles.css";


const ExtratoConta = () => {
    const { buscarSaldo, buscarNome } = useContext(ContaContext);
    const { obterMovimentacao, user } = useContext(MovimentoContext);
    const [movimentos, setMovimentos] = useState([]);

    const refresh = async () => {
        const movimentos = await obterMovimentacao();
        setMovimentos(movimentos);
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
        refresh();
    }, []);

    return (


        <div className="container-solicitar">

            <div className="title-solicitar">
                <h3 className="titulo-h5"> <img alt="" src={pageExtrato}></img> Solicitações de Contas</h3>
            </div>

            <div className="card-solicitar">

                <div className="linha-superior">

                    <div>
                        <input type="date" name="nDtInicio" id="IDtInicio" />
                        <input type="date" name="nDtFim" id="iDtFim" />
                        <Button variant="success" as="input" type="submit" value="Filtrar" className="estilo-botao"/>
                    </div>
     
                    <div>
                        <Button variant="success" as="input" type="submit" value="Exportar" className="estilo-botao" />    
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
                            {movimentos.map((record, index) => (
                                <tr key={index}>
                                    <td>{formatarData(record.DtMovimento)}</td>
                                    <td>{formatarEnum(record.TipoTransacao)}</td>
                                    <td>{formatarData(record.DtSituacao)}</td>
                                    <td>{formatarEnum(record.Situacao)}</td>
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