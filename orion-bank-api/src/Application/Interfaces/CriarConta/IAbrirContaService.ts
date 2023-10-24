import { ContaDto } from "../../DTOs/ContaDto";

export interface IAbrirContaService {
    EfetuarAberturaDeConta(contaDto: ContaDto) : Promise<void>
    SolicitacaoAberturaDeConta(contaDto: ContaDto) : Promise<void>
}