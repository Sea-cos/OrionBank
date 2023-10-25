import { Conta } from "../../Entities/Conta";
import { SolicitacaoAberturaConta } from "../../Entities/SolicitacaoAberturaConta";


export interface IAbrirContaRepository {
    EfetuarAberturaDeConta(conta: Conta) : Promise<void>
    SolicitacaoAberturaDeConta(mensagemSolicitacao: string) : Promise<void>
    ObterSolicitacoesAberturaDeConta(take: number, skip: number) : Promise<Array<SolicitacaoAberturaConta>>
}