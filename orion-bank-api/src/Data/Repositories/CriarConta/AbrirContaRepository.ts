import { Conta } from "../../../Domain/Entities/Conta";
import { IAbrirContaRepository } from "../../../Domain/Interfaces/AbrirConta/IAbrirContaRepository";
import { connection } from "../../context/ConnectionString";
import { v4 as uuidv4 } from 'uuid';
import { SolicitacaoAberturaDeConta } from '../../../Enums/SituacaoSolicitacaoConta'
import { SolicitacaoAberturaConta } from "../../../Domain/Entities/SolicitacaoAberturaConta";

export class AbrirContaRepository implements IAbrirContaRepository{

    async ObterSolicitacoesAberturaDeConta(take: number, skip: number) : Promise<Array<SolicitacaoAberturaConta>> {
        
        const parametros =  [
            take,
            skip
        ]

        const sql = "SELECT "
                        + "* "
                    + "FROM "
                        + "solicitacao_abertura_conta "
                    + "LIMIT ? " 
                    + "OFFSET ?"
        const solicitacoesAberturaConta = await (await connection).query(
            sql,
            parametros
        ) as any

        return solicitacoesAberturaConta[0] as Array<SolicitacaoAberturaConta>
    }

    EfetuarAberturaDeConta(conta: Conta) : Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    async SolicitacaoAberturaDeConta(mensagemSolicitacao: string) : Promise<void> {

        const parametros = [
            uuidv4(),
            mensagemSolicitacao,
            SolicitacaoAberturaDeConta.Ativa,
            new Date(),
            new Date()
        ]

        const sql = "INSERT INTO "
                        + "solicitacao_abertura_conta " 
                            + "(Codigo, MensagemSolicitacao, Situacao, DtSituacao, DtInclusao) "
                    + "VALUES "
                        + "(?, ?, ?, ?, ?)"

        await (await connection).query(
            sql,
            parametros
        );
    }
}