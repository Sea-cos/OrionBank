import { MovimentoPixDto } from "../../DTOs/MovimentoDto";
import { Movimento } from "../../../Domain/Entities/Movimento";
import { MovimentoDadosBancariosDto } from "../../DTOs/MovimentoDadosBancariosDto";

export interface IMovimentoService {
    RealizarTransacaoPixViaChave(movimento: MovimentoPixDto) : Promise<void>
    ObterUltimasTransacoes(codigoConta: string) : Promise<Movimento>
    RealizarTransacaoPorDadosBancarios(movimento: MovimentoDadosBancariosDto): Promise<void>
}