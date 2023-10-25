import { Conta } from "../../Entities/Conta";
import { SolicitacaoAberturaConta } from "../../Entities/SolicitacaoAberturaConta";


export interface IAbrirContaRepository {
    EfetuarAberturaDeConta(conta: Conta, codigoSolicitacao: string) : Promise<void>
    SolicitacaoAberturaDeConta(mensagemSolicitacao: string) : Promise<void>
    BuscarDocumentoFederalExistente(documentoFederal: string) : Promise<boolean>
    ObterSolicitacoesAberturaDeConta(take: number, skip: number) : Promise<Array<SolicitacaoAberturaConta>>
}