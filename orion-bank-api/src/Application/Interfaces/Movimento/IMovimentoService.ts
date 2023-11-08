import { MovimentoDto } from "../../DTOs/MovimentoDto";


export interface IMovimentoService {
    RealizarTransacaoPixViaChave(movimento: MovimentoDto) : Promise<void>
}