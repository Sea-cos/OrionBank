import { Conta } from "../../Entities/Conta";


export interface IAbrirContaRepository {
    EfetuarAberturaDeConta(conta: Conta) : Promise<void>
    SolicitacaoAberturaDeConta(mensagemSolicitacao: string) : Promise<void>
}