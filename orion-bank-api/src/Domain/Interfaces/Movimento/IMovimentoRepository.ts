import { Movimento } from "../../Entities/Movimento";


export interface IMovimentoRepository {
    RealizarTransacaoPixViaChave(movimento: Movimento) : Promise<void>
    ObterUltimasTransacoes(codigoConta: string) : Promise<Array<Movimento>>
    RealizarTransacaoPorDadosBancarios(movimento: Movimento) : Promise<void>
}