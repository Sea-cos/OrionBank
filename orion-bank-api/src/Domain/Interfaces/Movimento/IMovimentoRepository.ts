import { Movimento } from "../../Entities/Movimento";


export interface IMovimentoRepository {
    RealizarTransacaoPixViaChave(movimento: Movimento) : Promise<void>
    ObterUltimasTransacoes(codigoConta: string) : Promise<Movimento>
}