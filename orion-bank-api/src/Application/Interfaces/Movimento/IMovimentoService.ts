import { MovimentoPixDto } from "../../DTOs/MovimentoDto";


export interface IMovimentoService {
    RealizarTransacaoPixViaChave(movimento: MovimentoPixDto) : Promise<void>
}