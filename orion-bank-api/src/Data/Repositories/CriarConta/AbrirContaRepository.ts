import { Conta } from "../../../Domain/Entities/Conta";
import { IAbrirContaRepository } from "../../../Domain/Interfaces/AbrirConta/IAbrirContaRepository";
import { connection } from "../../context/ConnectionString";
import uuid from "uuid";
import { SolicitacaoAberturaDeConta } from '../../../Enums/SituacaoSolicitacaoConta'

export class AbrirContaRepository implements IAbrirContaRepository{

    EfetuarAberturaDeConta(conta: Conta) : Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    async SolicitacaoAberturaDeConta(mensagemSolicitacao: string) : Promise<void> {

        const fullDate = new Date()
        const dataAtual =`${fullDate.getFullYear()}-${fullDate.getMonth() + 1}-${fullDate.getDate()}`

        const sql = "INSERT INTO "
                        + "solicitacao_abertura_conta " 
                            + "(Codigo, MensagemSolicitacao, Situacao, DtSituacao, DtInclusao) "
                    + "VALUES "
                        + "(?, ?, ?, ?, ?)"

        await (await connection).query(
            sql,
            [
                uuid.v4(),
                mensagemSolicitacao,
                SolicitacaoAberturaDeConta.Ativa,
                dataAtual,
                dataAtual
            ]
        );
    }
}