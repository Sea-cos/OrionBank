import { ContaDto } from "../../DTOs/ContaDto";
import { SolicitacaoAberturaContaDto } from "../../DTOs/SolicitacaoAberturaContaDto";

export interface IAbrirContaService {
    EfetuarAberturaDeConta(contaDto: ContaDto, codigoSolicitacao: string) : Promise<void>
    SolicitacaoAberturaDeConta(contaDto: ContaDto) : Promise<void>
    ObterSolicitacoesAberturaDeConta(take: number, skip: number): Promise<Array<SolicitacaoAberturaContaDto>>
}