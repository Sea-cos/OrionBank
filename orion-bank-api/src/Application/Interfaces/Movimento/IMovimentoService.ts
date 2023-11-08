import { MovimentoPixDto } from "../../DTOs/MovimentoDto";
import { Movimento } from "../../../Domain/Entities/Movimento";

export interface IMovimentoService {
    RealizarTransacaoPixViaChave(movimento: MovimentoPixDto) : Promise<void>
    ObterUltimasTransacoes(codigoConta: string) : Promise<Movimento>
}